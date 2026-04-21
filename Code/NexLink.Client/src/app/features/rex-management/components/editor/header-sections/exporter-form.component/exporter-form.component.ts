import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-exporter-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './exporter-form.component.html',
  styleUrls: ['./exporter-form.component.scss']
})
export class ExporterFormComponent {
  @Input() exporterForm!: FormGroup;

  // Mock data for the dropdown - in production, this would come from a service
  exporters = [
    { id: 1, name: 'Penta Software Solutions' },
    { id: 2, name: 'NexLink Exports Pty Ltd' }
  ];
}