/**
 * Enumerates the supported user roles for the application.
 * Align these values with Keycloak role names and backend expectations.
 */
export enum Role {
  Admin = 'admin',
  Doctor = 'doctor',
  User = 'patient',
}

/**
 * Utility type for arrays of roles used in guard route data.
 */
export type AllowedRoles = readonly Role[];
