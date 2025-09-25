import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { DoctorDashboardComponent } from './components/dashboard/doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'profile',
        component: UserProfileComponent
    },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'doctor-dashboard', component: DoctorDashboardComponent },

];
