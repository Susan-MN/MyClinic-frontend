import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { DoctorDashboardComponent } from './components/dashboard/doctor-dashboard/doctor-dashboard.component';
import { RoutePaths } from './constants/routes';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { Role } from './models/roles.enum';

export const routes: Routes = [
  {
    path: RoutePaths.Root,
    component: HomeComponent,
    canActivate: [redirectGuard], // Redirect authenticated users to dashboards
  },
  {
    path: RoutePaths.ChooseRole,
    component: ChooseRoleComponent,
    canActivate: [authGuard], // Must be authenticated to choose role
  },
  {
    path: RoutePaths.UserDashboard,
    component: UserDashboardComponent,
    canActivate: [authGuard], // Only check authentication, backend handles role authorization
  },
  {
    path: RoutePaths.DoctorDashboard,
    component: DoctorDashboardComponent,
    canActivate: [authGuard], // Only check authentication, backend handles role authorization
  },
  {
    path: RoutePaths.AdminDashboard,
    loadComponent: () =>
      import('./components/dashboard/admin-dashboard/admin-dashboard').then(
        (m) => m.AdminDashboard
      ),
    canActivate: [roleGuard],
    data: { roles: [Role.Admin] },
  },
];
