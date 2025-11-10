import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

/**
 * Adds authentication token to API requests
 */
export function authHeadersInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const keycloak = inject(Keycloak);

  if (req.url.includes('/api/')) {
    if (keycloak.token) {
      const newRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + keycloak.token,
        },
      });
      return next(newRequest);
    }
  }

  return next(req);
}
