import { User } from 'types';

export const getUserById = (id: string): User => {
  if (id === '1') {
    return userOne;
  } else if (id === '2') {
    return userTwo;
  }
  throw new Error('Invalid user ID');
};

export const getAllUserIds = (): string[] => ['1', '2'];

const userOne = {
  firstName: 'Thomas',
  lastName: 'Geraghty',
};

const userTwo = {
  firstName: 'Tony',
  lastName: 'McAnulty',
};
