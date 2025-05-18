import type { EnhancedPokemon, PokemonDetails, PokemonListResponse } from '@src/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(
  offset: number,
  limit: number
): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }

  return response.json();
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
  }

  return response.json();
}

export function transformPokemonData(data: PokemonDetails): EnhancedPokemon {
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

function getStatValue(data: PokemonDetails, statName: string): number {
  const stat = data.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

export async function fetchPokemonBatch(offset: number, limit: number): Promise<EnhancedPokemon[]> {
  const listResponse = await fetchPokemonList(offset, limit);

  const detailsPromises = listResponse.results.map((pokemon) => fetchPokemonDetails(pokemon.url));

  const detailsResponses = await Promise.all(detailsPromises);
  return detailsResponses.map(transformPokemonData);
}
