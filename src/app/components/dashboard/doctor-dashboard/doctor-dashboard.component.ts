import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import { DoctorService } from '../../../services/doctor-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly keycloak = inject(Keycloak);
  private readonly doctorService = inject(DoctorService);

  myProfile: Doctor | null = null;
  loading = true;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadMyProfile();
  }

  loadMyProfile() {
    this.doctorService.getMyProfile().subscribe({
      next: (profile: Doctor) => {
        this.myProfile = profile;
        this.loading = false;
        this.errorMessage = null;
      },
      error: (err: Error) => {
        console.error('Error loading profile:', err);
        this.loading = false;

        if (err.message.includes('403')) {
          this.errorMessage =
            'Your doctor account is pending approval. Please wait for admin approval to access full features.';
        } else {
          this.errorMessage = 'Unable to load your profile. Please try again later.';
        }
      },
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  }

  async logout() {
    await this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }
}
