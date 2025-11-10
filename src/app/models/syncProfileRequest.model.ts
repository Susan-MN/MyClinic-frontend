/**
 * Payload used to synchronize a user's profile with the backend.
 */
export type BackendRole = 'doctor' | 'patient' | 'admin';

export interface SyncProfileRequest {
  keycloakId: string;
  username: string;
  email: string;
  role: BackendRole;
}
