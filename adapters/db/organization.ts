import { Organization } from 'types';

// These are just from changing some random chars, not real (but since we use current time we couldn't check anyways)
const ORGANIZATION_ONE_ID = '4e32a0e8f678106badef';
const ORGANIZATION_TWO_ID = 'aca54660fb9483246383';

export const getOrganizationById = (id: string): Organization => {
  if (id === ORGANIZATION_ONE_ID) {
    return orgOne;
  } else if (id === ORGANIZATION_TWO_ID) {
    return orgTwo;
  }
  throw new Error('Invalid organization ID');
};

export const getAllOrganizationIds = (): string[] => ['current', ORGANIZATION_ONE_ID, ORGANIZATION_TWO_ID];

// ID algorithm is secret + '_' + org name + current time(milliseconds) used for a SHA1, then get the first 20 characters
const orgOne = {
  id: ORGANIZATION_ONE_ID,
  name: 'Cool Company One',
  locations: [
    {
      simple: 'Galway, Ireland',
    },
  ],
  contactMethods: [],
  embeddedMedia: [],
  about: 'A cool company to work for',
};

// I used a sub value of auth0|5f8d78a7bbda50006a0fbd5c
const orgTwo = {
  id: ORGANIZATION_TWO_ID,
  name: 'Cool Company 2',
  locations: [],
  contactMethods: [],
  embeddedMedia: [],
  experience: [],
  about: '',
};
