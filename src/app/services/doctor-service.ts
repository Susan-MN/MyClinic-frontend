import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Fetches ALL doctors (admin only)
   */
  getAllDoctorsForAdmin(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(`${this.baseUrl}/api/admin/doctors`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches approved doctors only (for patient)
   */
  getApprovedDoctors(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(`${this.baseUrl}/api/doctors`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches current doctor's  profile
 
   */
  getMyProfile(): Observable<Doctor> {
    return this.http
      .get<Doctor>(`${this.baseUrl}/api/doctors/me`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Approves a doctor (admin only)
  
   */
  approveDoctor(id: string): Observable<Doctor> {
    return this.http
      .put<Doctor>(`${this.baseUrl}/api/admin/doctors/${id}/approve`, {})
      .pipe(catchError(this.handleError));
  }

  /**
   * Rejects a doctor (admin only)
   
   */
  rejectDoctor(id: string): Observable<Doctor> {
    return this.http
      .put<Doctor>(`${this.baseUrl}/api/admin/doctors/${id}/reject`, {})
      .pipe(catchError(this.handleError));
  }

  /**
   * Error handler for HTTP requests
   */
  private handleError(error: HttpErrorResponse) {
    console.error(' API Error:', error);
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
