import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Orchestrates the Header sections of a NEXDOC/EXDOC Request (REX).
 * Manages the layout for Status, Parties, Shipping, and Customs.
 */
@Component({
  selector: 'app-header-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {
  @Input() headerForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    // Initialization logic if required
  }

  getGroup(name: string): FormGroup {
    return this.headerForm.get(name) as FormGroup;
  }
}