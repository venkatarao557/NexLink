import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-packaging-metrics',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './packaging-metrics-form.component.html',
  styleUrls: ['./packaging-metrics-form.component.scss']
})
export class PackagingMetricsComponent {
  @Input() metricsForm!: FormGroup;
}