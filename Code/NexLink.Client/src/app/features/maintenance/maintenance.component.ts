import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaintenanceService, MaintenanceTable } from '../../services/nexlink-maintenance.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  private maintenanceService = inject(MaintenanceService);
  managementTables = signal<MaintenanceTable[]>([]);
  loading = signal(true);
  errorLoading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.maintenanceService.getAvailableTables().subscribe({
      next: (tables) => {
        this.managementTables.set(tables);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorLoading.set(true);
        this.errorMessage.set('Unable to load maintenance table catalog.');
        this.loading.set(false);
        console.error('Maintenance component failed to load tables:', err);
      }
    });
  }
}