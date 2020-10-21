import { User } from 'types';

const USER_ONE_ID = '4e32a0e8f678106baded';
const USER_TWO_ID = 'aca54660fb9483246382';

export const getUserById = (id: string): User => {
  if (id === 'current') {
    return userOne; // TODO: Get the currently logged in user. If no user logged in error
  } else if (id === USER_ONE_ID) {
    return userOne;
  } else if (id === USER_TWO_ID) {
    return userTwo;
  }
  throw new Error('Invalid user ID');
};

export const getAllUserIds = (): string[] => ['current', USER_ONE_ID, USER_TWO_ID];

// ID algorithm is secret + '_' + auth0 sub value used for a SHA1, then get the first 20 characters
const userOne = {
  id: USER_ONE_ID,
  firstName: 'Thomas',
  lastName: 'Geraghty',
  contactMethods: [],
};

// I used a sub value of auth0|5f8d78a7bbda50006a0fbd5c
const userTwo = {
  id: USER_TWO_ID,
  firstName: 'Tony',
  lastName: 'McAnulty',
  contactMethods: [],
};
