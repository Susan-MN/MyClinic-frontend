import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideKeycloak ,
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition
}  from 'keycloak-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {routes} from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
 import { environment } from './environments/environment';

 const bearerCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /\/api\/.*$/i  
});

bootstrapApplication(AppComponent, {
  providers: [
   // ...(appConfig.providers ?? []),
    //provideHttpClient(withInterceptorsFromDi()),

    // provideKeycloak({
    //   config: {
    //     url: environment.keycloakUrl ,
    //     realm: environment.keycloakRealm,
    //     clientId: environment.keycloakClientId,
    //   },
    //   initOptions: {
    //     onLoad: 'login-required',
    //     checkLoginIframe: false,
    //   },
   // }),

    
    // {
    //   provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    //   useValue: [bearerCondition],
    // },
    provideRouter(routes),
  ],
}).catch(err => console.error(err));