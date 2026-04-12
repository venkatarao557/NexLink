import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for @for
import { RouterModule } from '@angular/router'; // Needed for [routerLink]
import { MatCardModule } from '@angular/material/card'; // Fixes mat-card errors
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MaintenanceService, MaintenanceTable } from '../services/nexlink-maintenance.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  private maintenanceService = inject(MaintenanceService);
  //geoTables = ['Countries', 'Ports', 'Establishments', 'Regions'];
  //commodityTables = ['CommodityTypes', 'ProductClassifications', 'AHECC_Codes'];
  // Dynamic list of tables from the server
  managementTables = signal<MaintenanceTable[]>([]);
  ngOnInit() {
    this.maintenanceService.getAvailableTables().subscribe(tables => {
      this.managementTables.set(tables);
    });
  }
}