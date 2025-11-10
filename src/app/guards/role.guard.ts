import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { AllowedRoles } from '../models/roles.enum';

/**
 * Guard that checks if user has required role in Keycloak token
 * Only works for Admin role (stored in Keycloak)
 * Doctor/Patient authorization handled by backend (database-based)
 */
export const roleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  const allowedRoles: AllowedRoles | undefined = route.data?.['roles'];

  if (!keycloak?.authenticated) {
    await keycloak.login({ redirectUri: window.location.href });
    return false;
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
  const hasRole = allowedRoles.some((r) => userRoles.includes(r));

  if (!hasRole) {
    void router.navigate(['/']);
  }

  return hasRole;
};
