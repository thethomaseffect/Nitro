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
  currentLocation: {
    simple: 'Galway, Ireland',
  },
  contactMethods: [],
  embeddedMedia: [],
  experience: [
    {
      title: 'Title 1',
      startDate: '2019-11-02 11:35:56',
      location: {
        simple: 'Galway, Ireland',
      },
      description: 'My current job',
      skills: [
        {
          simple: 'A simple skill 1',
        },
        {
          simple: 'A simple skill 2',
        },
      ],
    },
    {
      title: 'Title 2',
      startDate: '2015-09-10 11:35:56',
      endDate: '2019-11-01 11:35:56',
      location: {
        simple: 'London, United Kingdom',
      },
      description: 'My old job',
      skills: [
        {
          simple: 'A simple skill 1',
        },
        {
          simple: 'A simple skill 2',
        },
        {
          simple: 'A simple skill 3',
        },
      ],
    },
  ],
  about: 'An engineer interested in type systems',
};

// I used a sub value of auth0|5f8d78a7bbda50006a0fbd5c
const userTwo = {
  id: USER_TWO_ID,
  firstName: 'Tony',
  lastName: 'McAnulty',
  contactMethods: [],
  embeddedMedia: [],
  experience: [],
  about: '',
};
