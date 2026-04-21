import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Import the sub-components we generated previously
import { ProductDetailsComponent } from   '../line-item-sections/product-details/product-details-form.component';
import { TreatmentDetailsComponent } from '../line-item-sections/treatment-details/treatment-details-form.component';
import { ContainerDetailsComponent } from '../line-item-sections/container-details/container-details-form.component';
import { AdditionalDetailsComponent } from '../line-item-sections/additional-details/additional-details-form.component';

@Component({
  selector: 'app-line-item-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    ProductDetailsComponent,
    TreatmentDetailsComponent,
    ContainerDetailsComponent,
    AdditionalDetailsComponent
  ],
  templateUrl: './line-item-container.component.html',
  styleUrls: ['./line-item-container.component.scss']
})
export class LineItemContainerComponent {
  @Input() lineItems!: FormArray;

  constructor() {}

  getGroup(item: any, name: string): FormGroup {
    return item.get(name) as FormGroup;
  }

  getArray(item: any, name: string): FormArray {
    return item.get(name) as FormArray;
  }

  addLineItem(): void {
    const newLineItem = new FormGroup({
      productDetails: new FormGroup({
        productType: new FormControl(''),
        netWeight: new FormControl(0, [Validators.required, Validators.min(1)]),
        unit: new FormControl('KGM')
      }),
      treatmentDetails: new FormGroup({
        treatment: new FormControl(''),
        treatmentDate: new FormControl(null)
      }),
      containerDetails: new FormGroup({
        containerNumber: new FormControl(''),
        sealNumber: new FormControl('')
      }),
      additionalCerts: new FormArray([])
    });
    this.lineItems.push(newLineItem);
  }

  removeLineItem(index: number): void {
    if (confirm('Are you sure you want to remove this product line?')) {
      this.lineItems.removeAt(index);
    }
  }
}