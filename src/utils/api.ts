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
  PokemonOverview,
} from "@/types/data";
import {
  addSpaces,
  convertBooleanToYesNo,
  moveObjectsToFirstPosition,
  pick,
} from "./data";
import { DisplayItemProps } from "@/components/Global/display.item";
import { ExtendedItem } from "@/components/RightSide/main.screen";

export interface APIConfig {
  url: string;
  params?: Record<string, string>;
  error?: string;
  key?: string;
}
export const apiSearch = async <T>({
  url,
  params,
  error,
  key,
}: APIConfig): Promise<T> => {
  let queryString = "";

  if (params) {
    const compiled = new URLSearchParams(params).toString();
    queryString = `?${compiled}`;
  }

  const response = await fetch(`${url}${queryString}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("not found");
    }

    throw new Error(error || "Failed to load data");
  }

  const data = await response.json();

  return key ? data[key] : (data as T);
};

export const getNestedUrls = (
  source: Record<string, any>,
  descriptionModifier: (id: string) => string,
  parentKey?: string
): Array<UrlObject> => {
  let clone: Array<UrlObject> = [];
  if (source) {
    Object.entries(source).forEach(([key, value]) => {
      if (typeof value === "string") {
        const base = parentKey ? `${parentKey}_` : "";
        const id = base + key;
        const description = descriptionModifier(id.replace(/_/g, " ").trim());
        clone.push({ id, url: value, description });
      }
      if (typeof value === "object") {
        const deep = getNestedUrls(value, descriptionModifier, key);
        clone = [...clone, ...deep];
      }
    });
  }

  return clone;
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
  abilities: Array<{ ability: PokeResource }>
): Promise<Ability[]> => {
  return await Promise.all(
    abilities.map(async (resource) => {
      const data = await fetchFromApi({
        url: resource.ability.url,
        error: resource.ability.name,
      });

      const clone = pick(data, ["id", "is_main_series"]);

      const ability: Partial<Ability> = { ...clone };
      const effectFull = getEnglishEntry<{
        short_effect: string;
        effect: string;
      }>(data.effect_entries);
      ability.name = addSpaces(data.name);
      ability.summary = effectFull?.short_effect;
      ability.description = effectFull?.effect;
      ability.effect_changes = data.effect_changes.map((effectEntry: any) => ({
        version: effectEntry.version_group.name,
        description: getEnglishEntry<{
          short_effect: string;
          effect: string;
        }>(effectEntry.effect_entries)?.effect,
      }));
      ability.flavor_text = getEnglishEntry<{ flavor_text: string }>(
        data.flavor_text_entries
      )?.flavor_text;
      return ability as Ability;
    })
  );
};

const normalizeForms = async (forms: Array<PokeResource>): Promise<Form[]> => {
  return await Promise.all(
    forms.map(async (resource) => {
      const data = await fetchFromApi({
        url: resource.url,
        error: resource.name,
      });

      const clone = pick(data, [
        "id",
        "order",
        "form_order",
        "is_battle_only",
        "is_mega",
        "name",
      ]);

      const form: Partial<Form> = { ...clone };
      form.display_name = addSpaces(data.name);
      form.version = data.version_group.name;
      form.types = data.types.map(
        ({ type }: { type: PokeResource }) => type.name
      );
      return form as Form;
    })
  );
};

const normalizeEvolutionChain = async (
  resource: PokeResource
): Promise<Evolution[]> => {
  const data = await fetchFromApi({
    url: resource.url,
    error: resource.name,
  });
  const result: Evolution[] = [];

  function cleanKeys(
    source: Partial<RawEvolutionDetail>
  ): Partial<EvolutionDetail> {
    if (!source || typeof source !== "object") {
      console.error("Invalid source", source);
      return source as Partial<EvolutionDetail>;
    }

    const clone: Partial<EvolutionDetail> = {};

    for (const [key, value] of Object.entries(source)) {
      if (value && typeof value === "object" && "name" in value) {
        // @ts-ignore
        clone[key as keyof EvolutionDetail] = (value as PokeResource).name;
      } else {
        clone[key as keyof EvolutionDetail] = value as any;
      }
    }

    return clone as Partial<EvolutionDetail>;
  }

  function traverse(node: ChainLink) {
    if (!node) return;
    const nodeData: Evolution = {
      is_baby: node.is_baby,
      name: node.species.name,
      display_name: addSpaces(node.species.name),
      details: node.evolution_details.map(({ trigger, ...rest }) => ({
        ...cleanKeys(rest as Partial<RawEvolutionDetail>),
        trigger: trigger.name,
      })) as EvolutionDetail[],
    };

    result.push(nodeData);

    if (node.evolves_to.length > 0) {
      node.evolves_to.forEach((child) => traverse(child));
    }
  }

  traverse(data.chain);
  return result;
};

const normalizeSpecies = async (resource: PokeResource): Promise<Species> => {
  const data = await fetchFromApi({
    url: resource.url,
    error: resource.name,
  });

  const clone = pick(data, [
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
  const species: Partial<Species> = { ...clone };
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

export function createPokemonOverview(pokemon: PokemonData): PokemonOverview {
  const firstAbility = pokemon.abilities[0]; // Take the first ability for simplicity
  const currentIndex = pokemon.evolution_chain.findIndex(
    ({ name }) => name === pokemon.name
  ); // Simplifying to the first evolution in the chain
  const next = pokemon.evolution_chain[currentIndex + 1];

  const weightInGrams = pokemon.weight * 100;
  const weightFormatted =
    weightInGrams >= 1000
      ? `${(weightInGrams / 1000).toFixed(2)} Kilograms`
      : `${weightInGrams} Grams`;

  return {
    id: pokemon.id,
    name: pokemon.display_name,
    type: pokemon.types.join(", "),
    description:
      pokemon.flavor_text || pokemon.description || "No description available",
    height: `${pokemon.height / 10}  Meters`, // converting decimeters to meters
    weight: weightFormatted, // Simplified weight calculation

    abilities: pokemon.abilities.map(({ name, description }) => ({
      name,
      description,
    })),
    generation: pokemon.generation,
    evolution: {
      current_stage: pokemon.name,
      evolves_to: next?.name || "No further evolution",
      evolves_from: pokemon.evolves_from || "No previous evolution",
      trigger: next?.details[0]?.trigger || "Unknown",
    },

    stats: {
      is_mythical: convertBooleanToYesNo(pokemon.is_mythical),
      is_legendary: convertBooleanToYesNo(pokemon.is_legendary),
      capture_rate: `${((pokemon.capture_rate / 255) * 100).toFixed(2)}%`,
      gender_rate:
        pokemon.gender_rate === -1
          ? "Genderless"
          : `${(pokemon.gender_rate / 8) * 100}% female`,
    },
  };
}

export const convertOverviewToDisplayItems = (
  overview: PokemonOverview
): Array<ExtendedItem> => {
  const first: ExtendedItem = {
    title: "General",
    key: "general",
    properties: [
      { name: "Name", value: overview.name },
      { name: "Type", value: overview.type },
      { name: "Description", value: overview.description },
    ],
  };

  const second: ExtendedItem = {
    title: "Physical",
    key: "physical",
    properties: [
      { name: "Height", value: overview.height },
      { name: "Weight", value: overview.weight },
    ],
  };

  const third: ExtendedItem = {
    title: "Abilities",
    key: "abilities",
    properties: overview.abilities.map(({ name, description }) => ({
      name,
      value: description,
    })),
  };

  const fourth: ExtendedItem = {
    title: "Evolution",
    key: "evolution",
    properties: [
      { name: "Current Stage", value: overview.evolution.current_stage },
      { name: "Evolves To", value: overview.evolution.evolves_to },
      { name: "Evolves From", value: overview.evolution.evolves_from },
      { name: "Trigger", value: overview.evolution.trigger },
    ],
  };

  const fifth: ExtendedItem = {
    title: "Stats",
    key: "stats",
    properties: [
      { name: "Is Mythical", value: overview.stats.is_mythical },
      { name: "Is Legendary", value: overview.stats.is_legendary },
      { name: "Capture Rate", value: overview.stats.capture_rate },
    ],
  };

  return [first, second, third, fourth, fifth];
};

export const genPokemonData = async (slug: string): Promise<PokemonData> => {
  const source = await apiSearch<any>({
    url: `https://pokeapi.co/api/v2/pokemon/${slug}`,
  });
  let base = pick<PokemonData>(source, [
    "id",
    "name",
    "height",
    "is_default",
    "weight",
  ]);
  base.display_name = addSpaces(source.name);
  base.abilities = await normalizeAbilities(source.abilities);
  base.forms = await normalizeForms(source.forms);
  base.types = base.forms.map(({ types }) => types).flat();
  base.games = source.game_indices.map(
    ({ version }: { version: { name: string } }) => version.name
  );
  base.sounds = getNestedUrls(source.cries, (id) => `${id} cry`);
  base.images = moveObjectsToFirstPosition(
    getNestedUrls(source.sprites, (id) => `${id} Sprite`),
    "id",
    "official-artwork"
  );
  const species = await normalizeSpecies(source.species);
  base = { ...base, ...species };
  base.overview = createPokemonOverview(base as PokemonData);
  return base as PokemonData;
};

export const getAllData = async (slug: string) => {
  const pokemon = await genPokemonData(slug);
  return pokemon;
};
