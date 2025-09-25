import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthService } from './app/services/auth.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

 const authService = new AuthService();

// keycloakService.init().then(() => {
//   bootstrapApplication(AppComponent, appConfig)
//     .catch(err => console.error(err));
// });

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes),
//       provideHttpClient() 
//   ]
// });
// authService.init() .then(() => { console.log(' Keycloak initialized before Angular bootstrap'); 
//     return bootstrapApplication(AppComponent, 
//         { ...appConfig, providers: [ ...appConfig.providers!, 
//             { provide: AuthService, useValue: authService } ] }); }) 
//             .catch(err => { console.error(' Keycloak init failed', err); }); 


 async function main() {
  try {
   
    const appRef = await bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...appConfig.providers!,
        AuthService
      ]
    });

    
    const injector = appRef.injector;
    const authService = injector.get(AuthService);

   
    await authService.init();
    console.log(' Keycloak initialized before routing');
  } catch (err) {
    console.error(' Bootstrap failed', err);
  }
}

main();
//bootstrapApplication(AppComponent,appConfig );
