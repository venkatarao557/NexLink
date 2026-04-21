import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent {
  @Input() inspectionForm!: FormGroup;

  // Mock data for establishments
  establishments = [
    { id: '77', display: '1 Australian Meat Holdings (Estab 77 sl/pk)' },
    { id: '101', display: 'Quality Meat Processors (Estab 101)' }
  ];
}