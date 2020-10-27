export type User = {
  id: string;
  firstName: string;
  lastName: string;
  surnameFirst?: true | undefined;
  currentLocation?: Location;
  contactMethods: ContactMethod[];
  about: string;
  embeddedMedia: EmbeddedMedia[];
  experience: RelevantExperience[];
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
  skills: Skill[];
};

type Location = SimpleLocation | ComplexLocation;

type SimpleLocation = {
  simple: string;
};

type ComplexLocation = {
  geo: string;
};

/**
 * Simple skills are those where the skill is hand-typed and complex are part of our
 * internal skills matrix. There will be a profile optimizer available that will attempt
 * to match simple skills to complex ones once they have been added (Exact matches are automatically
 * added) and an internal dashboard making it easy to see all simple skills that haven't been
 * upgraded with the ability to provide the matches.
 */
type Skill = SimpleSkill | ComplexSkill;

type SimpleSkill = {
  simple: string;
  duration?: string; // Skills default to the duration of the associated experience but can be refined
};

type ComplexSkill = {
  id: string;
  duration?: string; // Skills default to the duration of the associated experience but can be refined
};
