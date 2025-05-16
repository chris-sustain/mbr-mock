import { queryKeys } from './constants';

// Example
export const generateUserKey = (userId: number) => {
  // deliberately exclude the userToken from the dependency array
  //   to keep key consistent for userId regardless of token changes
  return [queryKeys.user, userId];
};
