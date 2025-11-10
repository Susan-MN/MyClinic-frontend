import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './generic-table.html',
  styleUrls: ['./generic-table.scss'],
})
export class GenericTable {
  private readonly router = inject(Router);

  @Input() title = 'Items';
  @Input() data: readonly GenericTableItem[] = [];

  @Output() actionClicked = new EventEmitter<{ action: string; row: GenericTableItem }>();

  onAction(action: string, row: GenericTableItem) {
    this.actionClicked.emit({ action, row });
  }

  goBack() {
    this.router.navigate(['/choose-role']);
  }
}
export interface GenericTableItem {
  imageUrl?: string;
  name: string;
  email?: string;
  specialization?: string;
  date: string | Date;
  location: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}
