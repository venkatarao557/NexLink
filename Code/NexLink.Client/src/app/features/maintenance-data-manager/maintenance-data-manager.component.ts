import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaintenanceService } from '../../services/nexlink-maintenance.service';
import { MaintenanceTable } from '../../core/models/maintenance.model';

@Component({
  selector: 'app-maintenance-data-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './maintenance-data-manager.component.html',
  styleUrls: ['./maintenance-data-manager.component.scss']
})
export class MaintenanceDataManagerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private maintenanceService = inject(MaintenanceService);
  private fb = inject(FormBuilder);

  tableName = signal<string>('');
 
  // 1. New signal to hold the master list of table metadata
  private availableTables = signal<MaintenanceTable[]>([]);

  dataSource = signal<any[]>([]);
  displayedColumns = signal<string[]>([]);
  editorMode = signal<'create' | 'edit' | null>(null);
  editingRow = signal<any | null>(null);
  editorForm = this.fb.group({});
  saving = signal(false);
  loading = signal(true);

  allColumns = computed(() => [...this.displayedColumns(), 'actions']);
  hasEditor = computed(() => this.editorMode() !== null);
  editorTitle = computed(() => this.editorMode() === 'create' ? 'Add Record' : 'Edit Record');
  private displayNameSignal = computed(() => {
    const name = this.tableName();
    const availableTables = this.availableTables();
    console.log('Computing display name for', name, 'available tables:', availableTables);
    const match = availableTables.find(t => t.routeValue === name)
    console.log('Computing display name for', name, 'found match:', match);
    return match ? match.displayName : name;
  });

  get displayName(): string {
    return this.displayNameSignal();
  }

  ngOnInit() {
// 4. Fetch the mapping list from the service
    this.maintenanceService.getAvailableTables().subscribe({
      next: (tables) => this.availableTables.set(tables),
      error: (err) => console.error('Could not load table metadata', err)
    });

    // 5. Watch for URL parameter changes
    this.route.params.subscribe(params => {
      this.tableName.set(params['tableName']);
      this.loadData();
    });
  }

  private clearEditor(): void {
    this.editorMode.set(null);
    this.editingRow.set(null);
    this.editorForm = this.fb.group({});
  }

  private buildEditorForm(initial: Record<string, any> = {}): void {
    const controls: Record<string, any> = {};
    for (const column of this.displayedColumns()) {
      controls[column] = [initial[column] ?? ''];
    }
    this.editorForm = this.fb.group(controls);
  }

  private getRecordId(row: any): string | undefined {
    if (!row) {
      return undefined;
    }

    const keys = Object.keys(row);
    const idKey = keys.find(key => key.toLowerCase() === 'id')
      || keys.find(key => key.toLowerCase().endsWith('id'));

    return idKey ? String(row[idKey]) : undefined;
  }

  loadData(): void {
    this.loading.set(true);
    this.maintenanceService.getTableData(this.tableName()).subscribe({
      next: (data) => {
        console.log(`Loaded data for table ${this.tableName()}:`, data);
        this.dataSource.set(data || []);
        if (data?.length > 0) {
          const keys = Object.keys(data[0]).filter(k => {
            const lowerK = k.toLowerCase();
            return !lowerK.endsWith('id') &&
              !lowerK.includes('guid') &&
              !lowerK.includes('rowversion') &&
              lowerK !== 'id';
          });
          this.displayedColumns.set(keys);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load NexLink table:', err);
        this.loading.set(false);
      }
    });
  }

  openEntryDialog(): void {
    this.editorMode.set('create');
    this.editingRow.set(null);
    this.buildEditorForm();
  }

  editRow(row: any): void {
    this.editorMode.set('edit');
    this.editingRow.set(row);
    this.buildEditorForm(row);
  }

  deleteRow(row: any): void {
    const id = this.getRecordId(row);
    if (!id) {
      console.error('Unable to delete record because no ID field was found.');
      return;
    }

    if (!confirm(`Delete this ${this.tableName()} record?`)) {
      return;
    }

    this.maintenanceService.deleteRecord(this.tableName(), id).subscribe({
      next: () => {
        this.loadData();
        this.clearEditor();
      },
      error: (err) => console.error('Failed to delete record:', err)
    });
  }

  saveRecord(): void {
    console.log('saveRecord called', {
      mode: this.editorMode(),
      valid: this.editorForm.valid,
      value: this.editorForm.value
    });

    if (!this.editorForm.valid) {
      console.warn('Editor form invalid, not saving');
      return;
    }

    const payload = this.editorForm.getRawValue();
    const table = this.tableName();
    this.saving.set(true);

    let request$ = this.editorMode() === 'create'
      ? this.maintenanceService.createRecord(table, payload)
      : null;

    if (this.editorMode() === 'edit') {
      const id = this.getRecordId(this.editingRow()!);
      if (!id) {
        console.error('Unable to update record because no ID field was found.');
        this.saving.set(false);
        return;
      }
      request$ = this.maintenanceService.updateRecord(table, id, payload);
    }

    if (!request$) {
      console.warn('No save request was created.');
      this.saving.set(false);
      return;
    }

    request$.subscribe({
      next: () => {
        console.log('Save successful for', table);
        this.loadData();
        this.clearEditor();
        this.saving.set(false);
      },
      error: (err) => {
        console.error('Failed to save record:', err);
        this.saving.set(false);
      }
    });
  }

  cancelEdit(): void {
    this.clearEditor();
  }
}
