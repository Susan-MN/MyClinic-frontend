import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideKeycloak } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideHttpClient() 
  
    //     provideKeycloak({
    //   config: {
    //     url: environment.keycloakUrl,
    //     realm: environment.keycloakRealm,
    //     clientId: environment.keycloakClientId,
    //   },
    //   initOptions: {
    //     onLoad: 'login-required', 
    //     checkLoginIframe: false,
    //    // redirectUri: window.location.origin + '/role',
    //   },
    // }),
    
  ]
};
