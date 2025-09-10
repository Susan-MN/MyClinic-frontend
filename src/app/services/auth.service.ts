import { Injectable,inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  //private keycloak=inject(KeycloakService);

async login(options?: any) {
    return this.keycloak.login(options);
  }

   logout() {
    return this.keycloak.logout();
  }
  async getToken():Promise<string>{
    return await this.keycloak.getToken();
  }
 async hasRole(role: string): Promise<boolean> {
    return await this.keycloak.isUserInRole(role);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.keycloak.isLoggedIn();
  }
  getUserProfile()
  {
    const token = this.keycloak.getKeycloakInstance().tokenParsed as any;
    return {
      keycloakId: token.sub,
      username: token.preferred_username,
      email: token.email
    };
  
  } 
  getUserRole(): string[] {
  
  return this.keycloak.getKeycloakInstance().realm_access?.roles || [];
}
  
}
