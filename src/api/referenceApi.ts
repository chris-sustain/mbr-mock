// import type { Reference } from '@src/types/reference';

export const baseUrl = 'https://swapi-node.vercel.app';
export const FETCH_REFERENCE_INITIAL_URL = baseUrl + '/api/people/';

export const fetchReference = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return response.json();
};

// export function transformReferenceData(data: ReferenceDetails): Reference {
//   return {
//     id: data.id,
//     name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
//     height: data.height / 10, // Convert to meters
//     weight: data.weight / 10, // Convert to kg
//     experience: data.base_experience,
//     types: data.types.map(
//       (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
//     ),
//     abilities: data.abilities.map((ability) =>
//       ability.ability.name
//         .split('-')
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ')
//     ),
//     hp: getStatValue(data, 'hp'),
//     attack: getStatValue(data, 'attack'),
//     defense: getStatValue(data, 'defense'),
//     specialAttack: getStatValue(data, 'special-attack'),
//     specialDefense: getStatValue(data, 'special-defense'),
//     speed: getStatValue(data, 'speed'),
//     sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default
//   };
// }

// export async function fetchReferenceBatch(offset: number, limit: number): Promise<Reference[]> {
//   const listResponse = await fetchReferenceList(offset, limit);

//   const detailsPromises = listResponse.results.map((reference) =>
//     fetchReferenceDetails(reference.url)
//   );

//   const detailsResponses = await Promise.all(detailsPromises);
//   return detailsResponses.map(transformReferenceData);
// }
