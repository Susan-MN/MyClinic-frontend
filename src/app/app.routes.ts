import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { UserDashboardComponent } from './features/dashboard/user-dashboard/user-dashboard.component';

import { ChooseRoleComponent } from './features/choose-role/choose-role.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard/doctor-dashboard.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  //{ path: '', redirectTo: 'choose-role', pathMatch: 'full' },
  // { path: 'role', component: ChooseRoleComponent, pathMatch: 'full' },
   { path: 'user-dashboard', component: UserDashboardComponent },
   { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'choose-role', component: ChooseRoleComponent },
  
  { path: '', component: HomeComponent }
//   { path: '**', redirectTo: 'choose-role' },
];