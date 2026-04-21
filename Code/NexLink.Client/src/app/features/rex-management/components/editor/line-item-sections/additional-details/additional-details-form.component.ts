import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-additional-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './additional-details-form.component.html',
  styleUrls: ['./additional-details-form.component.scss']
})
export class AdditionalDetailsComponent implements OnInit {
  @Input() additionalDetailsArray!: FormArray;

  displayedColumns: string[] = ['hcNbr', 'hcTemplate', 'hcEndorsementNbr', 'primaryCert'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.updateDataSource();
  }

  getFormGroup(index: number): FormGroup {
    return this.additionalDetailsArray.at(index) as FormGroup;
  }

  addRow(): void {
    const newGroup = new FormGroup({
      hcNbr: new FormControl(''),
      hcTemplate: new FormControl(''),
      hcEndorsementNbr: new FormControl(''),
      primaryCert: new FormControl(false)
    });
    this.additionalDetailsArray.push(newGroup);
    this.updateDataSource();
  }

  private updateDataSource(): void {
    this.dataSource.data = this.additionalDetailsArray.controls;
  }
}