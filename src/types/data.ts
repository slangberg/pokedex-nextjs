export interface UrlObject {
  id: string;
  url: string;
  description: string;
}

export interface Species {
  species_id: number;
  gender_rate: number;
  capture_rate: number;
  has_gender_differences: boolean;
  hatch_counter: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  growth_rate: Array<{ experience: number; level: number }>;
  pokedex_numbers: Array<{ entry_number: number; name: string }>;
  egg_groups: string[];
  color: string;
  shape: string;
  generation: string;
  flavor_text: string;
  description?: string;
  evolves_from?: string;
  evolution_chain: Evolution[];
}

export interface Form {
  display_name: string;
  name: string;
  id: number;
  form_order: number;
  is_battle_only: boolean;
  is_mega: boolean;
  order: number;
  version: string;
  types: string[];
}

export interface Ability {
  id: number;
  name: string;
  is_main_series: string;
  summary: string;
  description: string;
  effect_changes: Array<{ version: string; description: string }>;
  flavor_text: string;
}

export interface PokeResource {
  name: string;
  url: string;
}

export interface PokemonData extends Species {
  id: number;
  name: string;
  height: number;
  weight: number;
  display_name: string;
  is_default: boolean;
  forms: Form[];
  games: string[];
  abilities: Ability[];
  sounds: UrlObject[];
  images: UrlObject[];
  types: string[];
  overview: PokemonOverview;
}

export interface EvolutionDetail {
  item: string; // Item required to cause evolution
  trigger: string; // Type of event that triggers evolution
  gender: number; // Id of the gender required for evolution
  held_item?: string; // Item the Pokémon must be holding during the evolution trigger event
  known_move?: string; // Move that must be known during the evolution trigger event
  known_move_type?: string; // Move type that must be known during the evolution trigger event
  location?: string; // Location where the evolution must be triggered
  min_level?: number; // Minimum required level for evolution
  min_happiness?: number; // Minimum required happiness for evolution
  min_beauty?: number; // Minimum required beauty for evolution
  min_affection?: number; // Minimum required affection for evolution
  needs_overworld_rain?: boolean; // Whether it must be raining in the overworld for evolution
  party_species?: string; // Pokémon species that must be in the player's party for evolution
  party_type?: string; // Type of Pokémon that must be in the player's party for evolution
  relative_physical_stats?: number; // Relation between the Pokémon's Attack and Defense stats
  time_of_day?: string; // Required time of day for evolution (Day or night)
  trade_species?: string; // Pokémon species for which this one must be traded
  turn_upside_down?: boolean; // Whether the 3DS needs to be turned upside-down for evolution
}

export interface ChainLink {
  is_baby: boolean; // Whether or not this link is for a baby Pokémon
  species: PokeResource; // The Pokémon species at this point in the evolution chain
  evolution_details: RawEvolutionDetail[]; // Details regarding the evolution of the referenced Pokémon species
  evolves_to: ChainLink[]; // A list of chain objects
}

export interface RawEvolutionDetail {
  item: PokeResource; // Item required to cause evolution
  trigger: PokeResource; // Type of event that triggers evolution
  gender: number; // Id of the gender required for evolution
  held_item?: PokeResource; // Item the Pokémon must be holding during the evolution trigger event
  known_move?: PokeResource; // Move that must be known during the evolution trigger event
  known_move_type?: PokeResource; // Move type that must be known during the evolution trigger event
  location?: PokeResource; // Location where the evolution must be triggered
  min_level?: number; // Minimum required level for evolution
  min_happiness?: number; // Minimum required happiness for evolution
  min_beauty?: number; // Minimum required beauty for evolution
  min_affection?: number; // Minimum required affection for evolution
  needs_overworld_rain?: boolean; // Whether it must be raining in the overworld for evolution
  party_species?: PokeResource; // Pokémon species that must be in the player's party for evolution
  party_type?: PokeResource; // Type of Pokémon that must be in the player's party for evolution
  relative_physical_stats?: number; // Relation between the Pokémon's Attack and Defense stats
  time_of_day?: string; // Required time of day for evolution (Day or night)
  trade_species?: PokeResource; // Pokémon species for which this one must be traded
  turn_upside_down?: boolean; // Whether the 3DS needs to be turned upside-down for evolution
}

export type Evolution = Omit<
  ChainLink,
  "species" | "evolution_details" | "evolves_to"
> & {
  name: string;
  display_name: string;
  details: EvolutionDetail[];
};

export interface PokemonOverview {
  id: number;
  name: string;
  type: string;
  description: string;
  height: string;
  weight: string;
  abilities: Array<{ name: string; description: string }>;
  generation: string;
  evolution: {
    current_stage: string;
    evolves_to: string;
    evolves_from: string;
    trigger: string;
  };
  stats: {
    is_mythical: string;
    is_legendary: string;
    capture_rate: string;
    gender_rate: string;
  };
}

export type DisplayValue = string | number | boolean | null;
