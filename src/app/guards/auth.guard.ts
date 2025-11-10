import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

/**
 * Guard that ensures the user is authenticated before activating a route.
 */
export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);

  const isLoggedIn = Boolean(keycloak?.authenticated);
  if (!isLoggedIn) {
    await keycloak.login({ redirectUri: window.location.href });
    return false;
  }
  return true;
};
