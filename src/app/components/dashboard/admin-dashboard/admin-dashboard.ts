import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { DoctorService } from '../../../services/doctor-service';
import { Doctor } from '../../../models/doctor.model';
import { ProfileService } from '../../../services/profile-service';
import { Role } from '../../../models/roles.enum';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboard implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private readonly doctorService = inject(DoctorService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly profileService = inject(ProfileService);

  doctors: Doctor[] = [];
  loading = true;
  displayedColumns: string[] = ['username', 'email', 'specialty', 'status', 'actions'];

  // Sync admin profile on dashboard load
  async ngOnInit() {
    await this.syncAdminProfile();
    this.loadDoctors();
  }

  private async syncAdminProfile() {
    const profile = await this.keycloak.loadUserProfile();
    const keycloakId = this.keycloak.tokenParsed?.sub;

    if (keycloakId && profile.username && profile.email) {
      this.profileService
        .syncProfile({
          keycloakId,
          username: profile.username,
          email: profile.email,
          role: Role.Admin,
        })
        .subscribe({
          error: (err: Error) => console.error('Error syncing admin profile:', err),
        });
    }
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

  //  get status class
  getStatusClass(status: string | number | undefined): string {
    let statusText = status;

    if (status === 1) statusText = 'approved';
    if (status === 2) statusText = 'pending';
    if (status === 3) statusText = 'rejected';

    return `status-${statusText || 'pending'}`;
  }

  loadDoctors() {
    this.doctorService.getAllDoctorsForAdmin().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: Error) => {
        console.error('Error loading doctors:', err);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  approveDoctor(doctor: Doctor) {
    if (!doctor.id) {
      console.error(' Doctor ID missing');
      return;
    }

    this.doctorService.approveDoctor(doctor.id).subscribe({
      next: (updatedDoctor: Doctor) => {
        console.log(' Doctor approved successfully:', updatedDoctor);
        const index = this.doctors.findIndex((d) => d.id === doctor.id);
        if (index !== -1) {
          this.doctors[index] = { ...this.doctors[index], status: 'approved' };
          this.doctors = [...this.doctors];
          this.cdr.markForCheck();
        }
      },
      error: (err: Error) => {
        console.error(' Error approving doctor:', err);
      },
    });
  }

  rejectDoctor(doctor: Doctor) {
    if (!doctor.id) {
      console.error(' Doctor ID missing');
      return;
    }

    console.log(' Rejecting doctor:', doctor);
    this.doctorService.rejectDoctor(doctor.id).subscribe({
      next: (updatedDoctor: Doctor) => {
        console.log('Doctor rejected:', updatedDoctor);

        const index = this.doctors.findIndex((d) => d.id === doctor.id);
        if (index !== -1) {
          this.doctors[index] = { ...this.doctors[index], status: 'rejected' };
          this.doctors = [...this.doctors];
          this.cdr.markForCheck();
        }
      },
      error: (err: Error) => {
        console.error(' Error rejecting doctor:', err);
      },
    });
  }

  async logout() {
    await this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }
}
