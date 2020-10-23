export type User = {
  id: string;
  firstName: string;
  lastName: string;
  currentLocation?: Location;
  contactMethods: ContactMethod[];
  about: string;
  embeddedMedia: EmbeddedMedia[];
};

/**
 * Client-side code will examine URLs and transform results where required
 * eg. emails will have mailto added, small icons added beside each one for popular methods
 * such as twitter
 */
type ContactMethod = {
  label: string;
  url: string;
};

type EmbeddedMedia = {
  key: 'twitter-feed' | 'instagram-feed';
  value: string;
  settings?: {
    [key: string]: string;
  };
};

/**
 * This should be the experience all more specific types extend from, and it should
 * be general enough to cover professional, education, side-projects etc.
 */
type RelevantExperience = {
  title: string;
  startDate: string;
  endDate?: string;
  location?: Location;
  description?: string;
};

type Location = SimpleLocation | ComplexLocation;

type SimpleLocation = {
  simple: string;
};

type ComplexLocation = {
  geo: string;
};

type Skill = {
  title: string;
  id?: string; // Ideally skills will be part of the internal skills matrix, if so they'll have an associated id.
  duration?: string; // Skills default to the duration of the associated experience but can be refined
};
