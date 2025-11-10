import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTable } from '../../shared/generic-table/generic-table';
import type { GenericTableItem } from '../../shared/generic-table/generic-table';
import Keycloak from 'keycloak-js';
import { DoctorService } from '../../../services/doctor-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GenericTable,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private readonly doctorService = inject(DoctorService);

  userData: GenericTableItem[] = [];
  loading = true;

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getApprovedDoctors().subscribe({
      next: (doctors) => {
        console.log('Approved doctors loaded for patient:', doctors);
        this.userData = doctors.map((doc) => ({
          name: doc.username || 'Doctor',
          email: doc.email,
          specialization: doc.specialty || 'General Practice',
          date: doc.createdAt || new Date().toISOString(),
          location: doc.location || 'N/A',
          imageUrl: doc.imageUrl || 'assets/doctors/default.jpg',
          status: 'Confirmed' as 'Confirmed' | 'Pending' | 'Cancelled',
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(' Error loading doctors:', err);
        this.loading = false;
      },
    });
  }

  async logout() {
    await this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }
}
