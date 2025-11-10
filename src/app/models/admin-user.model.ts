/**
 * Represents a user row in the admin user listing.
 */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'blocked';
}
