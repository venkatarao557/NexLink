import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-consignee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './consignee-form.component.html',
  styleUrls: ['./consignee-form.component.scss']
})
export class ConsigneeFormComponent {
  @Input() consigneeForm!: FormGroup;
  @Output() notifyPartyRequested = new EventEmitter<void>();

  onNotifyParty(): void {
    this.notifyPartyRequested.emit();
  }
}