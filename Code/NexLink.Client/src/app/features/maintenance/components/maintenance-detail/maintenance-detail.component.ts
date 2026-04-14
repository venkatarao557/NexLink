import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceService } from '../../../../services/nexlink-maintenance.service';

@Component({
  selector: 'app-maintenance-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.scss']
})
export class MaintenanceDetailComponent implements OnInit {
  tableName = signal('');
  columnDefs: Array<{ field: string }> = [];
  rowData: any[] = [];

  constructor(private route: ActivatedRoute, private service: MaintenanceService) {}

  ngOnInit(): void {
    // Watch the URL for changes (e.g., /maintenance/Country to /maintenance/UnitOfMeasure)
    this.route.params.subscribe(params => {
      const tableName = params['tableName'];
      this.tableName.set(tableName);
      this.loadData(tableName);
    });
  }

  loadData(name: string): void {
    this.service.getTableData(name).subscribe(data => {
      this.rowData = data;
      if (data.length > 0) {
        this.columnDefs = Object.keys(data[0]).map(key => ({ field: key }));
      }
    });
  }
}