// src/app/features/rex-management/components/editor/rex-editor.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Custom Component Imports
import { HeaderContainerComponent } from './header-container/header-container.component';
import { LineItemContainerComponent } from './line-item-container/line-item-container.component';

@Component({
  selector: 'app-rex-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    HeaderContainerComponent,    // Add this
    LineItemContainerComponent    // Add this
  ],
  templateUrl: './rex-editor.component.html',
  styleUrls: ['./rex-editor.component.scss']
})
export class RexEditorComponent implements OnInit {
  rexForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rexForm = this.fb.group({
      header: this.fb.group({ /* your header controls */ }),
      lineItems: this.fb.array([]) // This is the base for your lineItemsArray
    });
  }

  // FIX: TS2339 - Property 'lineItemsArray' does not exist
  get lineItemsArray(): FormArray {
    return this.rexForm.get('lineItems') as FormArray;
  }

  // Add this getter to your class
  get headerFormGroup(): FormGroup {
    return this.rexForm.get('header') as FormGroup;
  }

  onSave(): void {
    console.log('Saving REX Draft...', this.rexForm.value);
    // Logic for saving locally or to a "Drafts" table in your DB
  }

  // Keep this for the final REX/NEXDOC submission
  onSubmit(): void {
    if (this.rexForm.valid) {
      console.log('Final Submission to DAFF:', this.rexForm.value);
    }
  }
}