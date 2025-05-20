export interface ReferenceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReferenceListItem[];
}

export interface ReferenceListItem {
  name: string;
  url: string;
}

export interface ReferenceDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: ReferenceType[];
  abilities: ReferenceAbility[];
  stats: ReferenceStat[];
  sprites: ReferenceSprites;
}

export interface ReferenceType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface ReferenceAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface ReferenceStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface ReferenceSprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface EnhancedReference {
  id: number;
  name: string;
  height: number;
  weight: number;
  experience: number;
  types: string[];
  abilities: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  sprite: string;
}
