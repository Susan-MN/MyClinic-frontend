import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user.model';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

  constructor(
    private router: Router) { }
    
  private readonly keycloak = inject(Keycloak);

  user: User | undefined;

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      const profile = await this.keycloak.loadUserProfile();

      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`,
        email: profile?.email,
        username: profile?.username
      };
    }
  }

  public async setRole(role: 'doctor' | 'user') {
    if (this.keycloak?.authenticated) {
    
      const profile = await this.keycloak.loadUserProfile();

      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`,
        email: profile?.email,
        username: profile?.username,
        keycloakId: this.keycloak.tokenParsed?.sub
      };
    }
    if (!this.user) {
      this.keycloak.login();
      return;
    }
    this.router.navigate([role === 'doctor' ? '/doctor-dashboard' : '/user-dashboard'], { replaceUrl: true });
  }
}
