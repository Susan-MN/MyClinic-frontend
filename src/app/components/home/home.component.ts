import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import Keycloak from 'keycloak-js';
import { RoutePaths } from '../../constants/routes';
import { DoctorService } from '../../services/doctor-service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private readonly doctorService = inject(DoctorService);
  private readonly cdr = inject(ChangeDetectorRef);

  doctors: Doctor[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadDoctors();
  }

  private loadDoctors(): void {
    this.loading = true;
    this.doctorService.getApprovedDoctors().subscribe({
      next: (doctors: Doctor[]) => {
        this.doctors = doctors;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Extract display name from username
  getDoctorName(doctor: Doctor): string {
    if (doctor.username) {
      const displayName = doctor.username.includes('@')
        ? doctor.username.split('@')[0]
        : doctor.username;
      return `Dr. ${displayName}`;
    }
    return 'Doctor';
  }

  //  Get doctor specialty
  getDoctorSpecialty(doctor: Doctor): string {
    return doctor.specialty || 'General Practice';
  }

  onLogin() {
    this.keycloak.login({
      redirectUri: `${window.location.origin}`,
    });
  }

  // New user registration - will select role after
  onRegister() {
    this.keycloak.register({
      redirectUri: `${window.location.origin}/${RoutePaths.ChooseRole}`,
    });
  }

  // Admin login - direct to admin dashboard
  onAdminLogin() {
    this.keycloak.login({
      redirectUri: `${window.location.origin}/${RoutePaths.AdminDashboard}`,
    });
  }
}
