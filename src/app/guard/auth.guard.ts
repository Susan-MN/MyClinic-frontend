import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard = async (): Promise<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedIn = await authService.isLoggedIn();
   if (!loggedIn) {
    
    await authService.login();
    return false;
  }
   const roles = authService.getUserRole();
  if (!roles.includes('doctor') && !roles.includes('user')) {
    router.navigate(['/choose-role']);
    return false;
  }
  return true;
};