export type User = {
  id: string;
  firstName: string;
  lastName: string;
  currentLocation?: {
    simple?: string; // I'll add fancy geo features later and this will likely be a backup for people who don't want those
  };
  contactMethods: ContactMethod[];
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
