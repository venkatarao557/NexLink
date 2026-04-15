import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MaintenanceService } from '../../services/nexlink-maintenance.service';

@Component({
  selector: 'app-maintenance-data-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './maintenance-data-manager.component.html',
  styleUrls: ['./maintenance-data-manager.component.scss']
})
export class MaintenanceDataManagerComponent implements OnInit {
  // Using the new 'inject' function (common in v21) instead of constructor
  private route = inject(ActivatedRoute);
  private maintenanceService = inject(MaintenanceService);

  tableName = signal<string>('');
  dataSource = signal<any[]>([]);
  displayedColumns = signal<string[]>([]);

  allColumns = computed(() => [...this.displayedColumns(), 'actions']);

  ngOnInit() {
    // Listen for route parameter changes (e.g., /maintenance/Ports)
    this.route.params.subscribe(params => {
      this.tableName.set(params['tableName']);
      this.loadData();
    });
  }

  loadData() {
    this.maintenanceService.getTableData(this.tableName()).subscribe({
      next: (data) => {
        this.dataSource.set(data);
        if (data.length > 0) {
          // Auto-generate columns based on NexLink table keys
          const keys = Object.keys(data[0]).filter(k => {
            const lowerK = k.toLowerCase();
            return !lowerK.endsWith('id') && // Catches 'id', 'countryId', 'portId'
              !lowerK.includes('guid') &&
              !lowerK.includes('rowversion') &&
              lowerK !== 'id';
          });
          this.displayedColumns.set(keys);
        }
      },
      error: (err) => console.error('Failed to load NexLink table:', err)
    });
  }
  openEntryDialog() { console.log('Add new record clicked'); }
  editRow(row: any) { console.log('Edit row:', row); }
  deleteRow(row: any) { console.log('Delete row:', row); }
}