import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../models/user.model';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile-service';
import { Subject, takeUntil } from 'rxjs';
import { Role } from '../../models/roles.enum';
import { RoutePaths } from '../../constants/routes';

@Component({
  selector: 'app-choose-role',
  templateUrl: 'choose-role.component.html',
})
/**
 * Choose Role component
 * - Allows new users to select their role (Doctor or Patient)
 * - Syncs profile to backend
 */
export class ChooseRoleComponent implements OnInit, OnDestroy {
  private readonly keycloak = inject(Keycloak);
  private readonly router = inject(Router);
  private readonly profileService = inject(ProfileService);

  user: User | undefined;
  private readonly destroy$ = new Subject<void>();
  readonly Role = Role;

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      const profile = await this.keycloak.loadUserProfile();

      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`,
        email: profile?.email,
        username: profile?.username,
      };
    }
  }

  public async setRole(role: Role) {
    console.log('Role selected:', role);

    if (!this.keycloak?.authenticated) {
      this.keycloak.login();
      return;
    }

    const profile = await this.keycloak.loadUserProfile();
    const keycloakId = this.keycloak.tokenParsed?.sub;

    console.log({
      keycloakId,
      username: profile.username,
      email: profile.email,
    });

    if (!keycloakId || !profile.username || !profile.email) {
      console.error('Missing required profile data');
      return;
    }

    this.user = {
      name: `${profile?.firstName} ${profile.lastName}`,
      email: profile?.email,
      username: profile?.username,
      keycloakId: keycloakId,
    };

    // Sync profile to backend database (role stored in DB not Keycloak)
    this.profileService
      .syncProfile({
        keycloakId: keycloakId,
        username: profile.username,
        email: profile.email,
        role: role,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async () => {
          console.log('Profile synced successfully!');

          const dashboardPath =
            role === Role.Doctor
              ? `/${RoutePaths.DoctorDashboard}`
              : `/${RoutePaths.UserDashboard}`;

          await this.router.navigate([dashboardPath], { replaceUrl: true });
        },
        error: (err) => {
          console.error('Error syncing profile:', err);

          const dashboardPath =
            role === Role.Doctor
              ? `/${RoutePaths.DoctorDashboard}`
              : `/${RoutePaths.UserDashboard}`;

          this.router.navigate([dashboardPath], { replaceUrl: true });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
