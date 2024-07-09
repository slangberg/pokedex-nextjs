import {
  Ability,
  Evolution,
  EvolutionDetail,
  Form,
  PokeResource,
  PokemonData,
  Species,
  UrlObject,
  RawEvolutionDetail,
  ChainLink,
} from "@/types/data";
import { moveObjectToFirstPosition, pick } from "./data";

const BASE_URL = "https://pokeapi.co/api/v2/";

export interface APIConfig {
  url: string;
  params?: Record<string, string>;
  error?: string;
}

export const apiSearch = async <T>({
  url,
  params,
  error,
}: APIConfig): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const response = await fetch(`${BASE_URL}/${url}${queryString}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("not found");
    }
    throw new Error(error || "Failed to load data");
  }

  return (await response.json()) as T;
};

export const getNestedUrls = (
  source: Record<string, any>,
  descriptionModifier: (id: string) => string,
  parentKey?: string
): UrlObject[] => {
  const result: UrlObject[] = [];

  const traverse = (obj: Record<string, any>, parent?: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      const id = parent ? `${parent}_${key}` : key;
      if (typeof value === "string") {
        const description = descriptionModifier(id.replace(/_/g, " ").trim());
        result.push({ id, url: value, description });
      } else if (typeof value === "object") {
        traverse(value, id);
      }
    });
  };

  traverse(source, parentKey);
  return result;
};

export const fetchFromApi = async ({
  url,
  error,
}: {
  url: string;
  error: string;
}): Promise<any> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      console.error(error);
    }
    throw new Error(error || "Failed to load data");
  }

  return await response.json();
};

type Language = {
  name: string;
  url: string;
};

type WithLanguage<T> = T & { language: Language };

const getEnglishEntry = <T>(data: WithLanguage<T>[]): T | null => {
  const engEntry = data.find(
    ({ language }) => language && language.name === "en"
  );
  if (engEntry) {
    const { language, ...entryWithoutLanguage } = engEntry;
    return entryWithoutLanguage as T;
  }
  return null;
};

const normalizeAbilities = async (
  abilities: { ability: PokeResource }[]
): Promise<Ability[]> => {
  return await Promise.all(
    abilities.map(async (resource) => {
      const data = await fetchFromApi({
        url: resource.ability.url,
        error: resource.ability.name,
      });

      const ability: Partial<Ability> = pick(data, ["id", "is_main_series"]);
      const effectFull = getEnglishEntry<{
        short_effect: string;
        effect: string;
      }>(data.effect_entries);

      if (effectFull) {
        ability.summary = effectFull.short_effect;
        ability.description = effectFull.effect;
      }

      ability.effect_changes = data.effect_changes.map((effectEntry: any) => ({
        version: effectEntry.version_group.name,
        description: getEnglishEntry<{ short_effect: string; effect: string }>(
          effectEntry.effect_entries
        )?.effect,
      }));

      ability.flavor_text = getEnglishEntry<{ flavor_text: string }>(
        data.flavor_text_entries
      )?.flavor_text;

      return ability as Ability;
    })
  );
};

const normalizeForms = async (forms: PokeResource[]): Promise<Form[]> => {
  return await Promise.all(
    forms.map(async (resource) => {
      const data = await fetchFromApi({
        url: resource.url,
        error: resource.name,
      });

      const form: Partial<Form> = pick(data, [
        "id",
        "name",
        "order",
        "form_order",
        "is_battle_only",
        "is_mega",
        "form_name",
      ]);

      form.version = data.version_group.name;

      return form as Form;
    })
  );
};

const normalizeEvolutionChain = async (
  resource: PokeResource
): Promise<Evolution[]> => {
  const data = await fetchFromApi({ url: resource.url, error: resource.name });
  const result: Evolution[] = [];

  const cleanKeys = (
    source: Partial<RawEvolutionDetail>
  ): Partial<EvolutionDetail> => {
    if (!source || typeof source !== "object") {
      return source as Partial<EvolutionDetail>;
    }

    const clone: Partial<EvolutionDetail> = {};
    for (const [key, value] of Object.entries(source)) {
      clone[key as keyof EvolutionDetail] =
        value && typeof value === "object" && "name" in value
          ? (value as PokeResource).name
          : (value as any);
    }

    return clone;
  };

  const traverse = (node: ChainLink) => {
    if (!node) return;

    const nodeData: Evolution = {
      is_baby: node.is_baby,
      name: node.species.name,
      details: node.evolution_details.map(({ trigger, ...rest }) => ({
        ...cleanKeys(rest as Partial<RawEvolutionDetail>),
        trigger: trigger.name,
      })) as EvolutionDetail[],
    };
    result.push(nodeData);

    node.evolves_to.forEach((child) => traverse(child));
  };

  traverse(data.chain);
  return result;
};

const normalizeSpecies = async (resource: PokeResource): Promise<Species> => {
  const data = await fetchFromApi({ url: resource.url, error: resource.name });

  const species: Partial<Species> = pick(data, [
    "gender_rate",
    "capture_rate",
    "base_happiness",
    "is_baby",
    "is_legendary",
    "is_mythical",
    "hatch_counter",
    "has_gender_differences",
    "forms_switchable",
  ]);

  const growthRate = await fetchFromApi({
    url: data.growth_rate.url,
    error: `${resource.name} growth_rate`,
  });
  species.evolution_chain = await normalizeEvolutionChain(data.evolution_chain);
  species.species_id = data.id;
  species.growth_rate = growthRate.levels;
  species.pokedex_numbers = data.pokedex_numbers.map(
    ({
      entry_number,
      pokedex,
    }: {
      entry_number: number;
      pokedex: { name: string };
    }) => ({
      entry_number,
      name: pokedex.name,
    })
  );
  species.egg_groups = data.egg_groups.map(({ name }: PokeResource) => name);
  species.color = data.color.name;
  species.shape = data.shape.name;
  species.evolves_from = data.evolves_from_species?.name;
  species.generation = data.generation.name;
  species.flavor_text = getEnglishEntry<{ flavor_text: string }>(
    data.flavor_text_entries
  )?.flavor_text;
  species.description = getEnglishEntry<{ description: string }>(
    data.form_descriptions
  )?.description;

  return species as Species;
};

export const genPokemonData = async (slug: string): Promise<PokemonData> => {
  const source = await apiSearch<any>({ url: `/pokemon/${slug}` });

  let base = pick<PokemonData>(source, [
    "id",
    "name",
    "height",
    "is_default",
    "weight",
  ]);
  base.abilities = await normalizeAbilities(source.abilities);
  base.forms = await normalizeForms(source.forms);
  base.games = source.game_indices.map(
    ({ version }: { version: { name: string } }) => version.name
  );
  base.sounds = getNestedUrls(source.cries, (id) => `${id} cry`);
  base.images = moveObjectToFirstPosition(
    getNestedUrls(source.sprites, (id) => `${id} Sprite`),
    "official-artwork_front_default"
  );

  const species = await normalizeSpecies(source.species);
  base = { ...base, ...species };

  return base as PokemonData;
};
