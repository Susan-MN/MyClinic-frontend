import { Injectable,inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private keycloak: Keycloak | undefined;
  //private keycloak=inject(KeycloakService);
  
 init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloak = new Keycloak({
       url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId
      });
console.log('Keycloak instance:', this.keycloak);
console.log('Token:', this.keycloak?.token);
console.log('Parsed token:', this.keycloak?.tokenParsed);

      this.keycloak.init({
       onLoad: 'check-sso',
         checkLoginIframe: false,
           pkceMethod: 'S256', 
            redirectUri: window.location.origin ,
           silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }).then(authenticated => {
        console.log('Keycloak init success, authenticated:', authenticated);
         if (authenticated) {
        this.navigateBasedOnRole();
        this.startTokenRefresh();
      }
        resolve();
      }).catch(err => {
        console.error('Keycloak init failed', JSON.stringify(err));
        reject(err);
      });
    });
  }
login(): void {
  this.keycloak?.login({
    redirectUri: window.location.origin+'choose-role'
  });
}
register(): void {
  if (!this.keycloak) {
    console.error('Keycloak not initialized yet');
    return;
  }

  this.keycloak?.register({
    redirectUri: window.location.origin +'/choose-role'
  });
}


  logout(): void {
    this.keycloak?.logout({ redirectUri: window.location.origin });
  }

  getKeycloakInstance(): Keycloak | undefined {
    return this.keycloak;
  }
    
    getUserProfile(): { keycloakId: string; username: string; email: string } | null {
    if (!this.keycloak?.tokenParsed) return null;
 
    const token = this.keycloak.tokenParsed as any;
    console.error(token);
    return {
      keycloakId: token.sub,
      username: token.preferred_username,
      email: token.email
    };
  }
  navigateBasedOnRole(): void {

  const roles = (this.keycloak?.realmAccess?.roles) || [];

  if (roles.includes('doctor')) {
    window.location.href = '/doctor-dashboard';
  } else if (roles.includes('user')) {
    window.location.href = '/user-dashboard';
  } else {
    console.warn('No matching role, staying on home');
  }
}
startTokenRefresh(): void {
  if (!this.keycloak) return;

  setInterval(() => {
    this.keycloak?.updateToken(60).catch(() => {
      console.warn(" Token refresh failed, logging out...");
      this.logout();
    });
  }, 30000); 
}

}
