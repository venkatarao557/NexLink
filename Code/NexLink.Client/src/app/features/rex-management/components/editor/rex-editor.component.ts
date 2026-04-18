import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

// Material Imports
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rex-editor',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTabsModule, MatIconModule, 
    MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, 
    MatSelectModule, MatSnackBarModule
  ],
  templateUrl: './rex-editor.component.html',
  styleUrls: ['./rex-editor.component.scss']
})
export class RexEditorComponent implements OnInit {
  rexForm!: FormGroup;
  activeMainSection = 'Line Items';
  activeLineItemIndex = 0;
  rexId: string | null = null;
  pageTitle = 'New Request for Export';

  mainSections = [
    'Status', 'Exporter', 'Shipping', 'Consignee', 'Customs', 
    'Inspection', "Ship Hold's Inspection", 'Transit Location', 
    'Support Documents', 'Miscellaneous Details', 'Line Items'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.rexId = this.route.snapshot.params['id'];
    if (this.lineItemsArray.length === 0) {
      this.addLineItem(); 
    }
  }

  private initForm() {
    this.rexForm = this.fb.group({
      header: this.fb.group({
        status: this.fb.group({ currentStatus: ['Draft'] }),
        exporter: this.fb.group({ name: [''], estNo: [''] }),
        shipping: this.fb.group({ vessel: [''], portLoading: [''] }),
        consignee: this.fb.group({ name: [''], country: ['AU'] }),
        customs: this.fb.group({ agent: [''] }),
        inspection: this.fb.group({ location: [''] }),
        shipHold: this.fb.group({ inspector: [''] }),
        transit: this.fb.group({ location: [''] }),
        supportDocs: this.fb.group({ reference: [''] }),
        miscellaneous: this.fb.group({ comments: [''] })
      }),
      lineItems: this.fb.array([])
    });
  }

  get lineItemsArray(): FormArray {
    return this.rexForm.get('lineItems') as FormArray;
  }

  addLineItem() {
    const itemGroup = this.fb.group({
      productDetails: this.fb.group({ productName: ['', Validators.required] }),
      packagingMetrics: this.fb.group({ qty: [0], unit: ['Cartons'] }),
      usageDetails: this.fb.group({ intendedUse: ['Human Consumption'] }),
      deptRequirements: this.fb.group({ certCodes: [''] }),
      establishmentDetails: this.fb.group({ estNumber: [''] }),
      treatmentDetails: this.fb.group({ treatmentType: ['Chilled'] }),
      containerDetails: this.fb.group({ containerNo: [''] }),
      supportingDocs: this.fb.group({ docId: [''] }),
      certificateDetails: this.fb.group({ certType: [''] }),
      additionalDetails: this.fb.group({ remarks: [''] })
    });
    
    this.lineItemsArray.push(itemGroup);
    this.activeLineItemIndex = this.lineItemsArray.length - 1;
  }

  removeLineItem(index: number, event?: Event) {
    if (event) event.stopPropagation();
    if (this.lineItemsArray.length > 1) {
      this.lineItemsArray.removeAt(index);
      this.activeLineItemIndex = Math.max(0, index - 1);
    } else {
      this.snackBar.open('At least one line item is required.', 'OK', { duration: 2000 });
    }
  }

  getSectionIcon(section: string): string {
    const icons: Record<string, string> = {
      'Status': 'info', 'Exporter': 'business', 'Shipping': 'local_shipping',
      'Consignee': 'person', 'Customs': 'gavel', 'Inspection': 'verified',
      "Ship Hold's Inspection": 'anchor', 'Transit Location': 'place',
      'Support Documents': 'description', 'Miscellaneous Details': 'more_horiz',
      'Line Items': 'inventory_2'
    };
    return icons[section] || 'folder';
  }

  onSave() {
    this.snackBar.open('REX Saved Successfully', 'Success', { duration: 2000 });
  }

  goBack() { this.router.navigate(['/rex-management']); }
}