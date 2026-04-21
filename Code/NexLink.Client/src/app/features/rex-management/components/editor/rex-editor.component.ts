import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// Orchestration Containers
import { HeaderContainerComponent } from '../header-container/header-container.component';
import { LineItemContainerComponent } from '../line-item-container/line-item-container.component';

@Component({
  selector: 'app-rex-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HeaderContainerComponent,
    LineItemContainerComponent
  ],
  templateUrl: './rex-editor.component.html',
  styleUrls: ['./rex-editor.component.scss']
})
export class RexEditorComponent implements OnInit {
  rexForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.rexForm = new FormGroup({
      // Header Section
      header: new FormGroup({
        status: new FormGroup({
          rexNumber: new FormControl('', Validators.required),
          status: new FormControl('DRAFT')
        }),
        parties: new FormGroup({
          exporterId: new FormControl(''),
          consigneeName: new FormControl('')
        }),
        shipping: new FormGroup({
          transportMode: new FormControl('SEA'),
          vesselName: new FormControl('')
        })
      }),
      // Line Items Section
      lineItems: new FormArray([])
    });
  }

  get lineItemsArray(): FormArray {
    return this.rexForm.get('lineItems') as FormArray;
  }

  onSave(): void {
    console.log('Saving REX Data:', this.rexForm.value);
    // This is where you'll trigger your NexDoc integration service
  }

  onSubmit(): void {
    if (this.rexForm.valid) {
      console.log('Submitting to DAFF...');
    }
  }
}