import type {
  EnhancedReference,
  ReferenceDetails,
  ReferenceListResponse
} from '@src/types/reference';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchReferenceList(
  offset: number,
  limit: number
): Promise<ReferenceListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Reference list: ${response.status}`);
  }

  return response.json();
}

export async function fetchReferenceDetails(url: string): Promise<ReferenceDetails> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Reference details: ${response.status}`);
  }

  return response.json();
}

export function transformReferenceData(data: ReferenceDetails): EnhancedReference {
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    height: data.height / 10, // Convert to meters
    weight: data.weight / 10, // Convert to kg
    experience: data.base_experience,
    types: data.types.map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    ),
    abilities: data.abilities.map((ability) =>
      ability.ability.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ),
    hp: getStatValue(data, 'hp'),
    attack: getStatValue(data, 'attack'),
    defense: getStatValue(data, 'defense'),
    specialAttack: getStatValue(data, 'special-attack'),
    specialDefense: getStatValue(data, 'special-defense'),
    speed: getStatValue(data, 'speed'),
    sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default
  };
}

function getStatValue(data: ReferenceDetails, statName: string): number {
  const stat = data.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

export async function fetchReferenceBatch(
  offset: number,
  limit: number
): Promise<EnhancedReference[]> {
  const listResponse = await fetchReferenceList(offset, limit);

  const detailsPromises = listResponse.results.map((reference) =>
    fetchReferenceDetails(reference.url)
  );

  const detailsResponses = await Promise.all(detailsPromises);
  return detailsResponses.map(transformReferenceData);
}
