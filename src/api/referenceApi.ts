// wait for backend to be ready
// import type { Reference } from '@src/types/reference';

export const baseUrl = 'https://swapi-node.vercel.app';
export const FETCH_REFERENCE_INITIAL_URL = baseUrl + '/api/people/';

//wait for back disable eslint @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchReference = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return response.json();
};
