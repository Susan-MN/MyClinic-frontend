import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SyncProfileRequest } from '../models/syncProfileRequest.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Synchronize the authenticated user's profile and role with the backend.
   * @param request Fully-typed profile payload containing role information.
   * @returns Observable that completes when the profile sync is successful.
   */
  syncProfile(request: SyncProfileRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/profile/sync`, request);
  }

  /**
   * Get authenticated user's profile from database
   * @returns Observable that emits an object containing role and status
   */
  getMyProfile(): Observable<{ role: string; status?: string }> {
    return this.http.get<{ role: string; status?: string }>(`${this.baseUrl}/api/profile/me`);
  }
}
