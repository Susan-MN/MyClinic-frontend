import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { RoutePaths } from '../constants/routes';
import { ProfileService } from '../services/profile-service';
import { firstValueFrom } from 'rxjs';

/**
 * Guard that redirects authenticated users to their appropriate dashboard
 * - Admin role checked from Keycloak token
 * - Doctor/Patient roles fetched from database
 */
export const redirectGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);
  const profileService = inject(ProfileService);

  if (!keycloak?.authenticated) {
    return true;
  }

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];

  if (roles.includes('admin')) {
    void router.navigate([`/${RoutePaths.AdminDashboard}`], { replaceUrl: true });
    return false;
  }

  try {
    const profile = await firstValueFrom(profileService.getMyProfile());

    if (profile.role === 'doctor') {
      void router.navigate([`/${RoutePaths.DoctorDashboard}`], { replaceUrl: true });
      return false;
    } else if (profile.role === 'patient') {
      void router.navigate([`/${RoutePaths.UserDashboard}`], { replaceUrl: true });
      return false;
    }
  } catch (error) {
    console.log('redirectGuard: Error fetching profile', error);
  }

  return true;
};
