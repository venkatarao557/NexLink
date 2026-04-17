import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

// Angular Material Imports
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rex-editor',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatTabsModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './rex-editor.component.html',
  styleUrls: ['./rex-editor.component.scss']
})
export class RexEditorComponent implements OnInit {
  rexForm!: FormGroup;
  pageTitle: string = 'New Request for Export';
  mode: string = 'create';
  rexId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit() {
    // 1. Capture Routing Data
    this.mode = this.route.snapshot.data['mode'] || 'create';
    this.pageTitle = this.route.snapshot.data['title'] || 'Request for Export';
    this.rexId = this.route.snapshot.params['id'];

    // 2. Handle specific modes
    if (this.mode === 'amend' && this.rexId) {
      this.loadRexData(this.rexId);
    } else if (this.mode === 'load') {
      this.snackBar.open('Ready for External Data Import', 'Close', { duration: 3000 });
    } else {
      // Default: Start with one blank line item for 'Create' mode
      this.addLineItem();
    }
  }

  private initForm() {
    this.rexForm = this.fb.group({
      // Parent Header: 9 Logical Sections
      header: this.fb.group({
        exporter: this.fb.group({ name: [''], estNo: [''] }),
        consignee: this.fb.group({ name: [''], country: ['US'] }),
        shipping: this.fb.group({ vessel: [''], portLoading: [''], portDischarge: [''] }),
        customs: this.fb.group({ agent: [''] }),
        inspection: this.fb.group({ location: [''] }),
        shipHold: this.fb.group({ inspector: [''] }),
        transit: this.fb.group({ details: [''] }),
        supportDocs: this.fb.group({ reference: [''] }),
        miscellaneous: this.fb.group({ comments: [''] })
      }),
      // Child Array: Collection of Line Items
      lineItems: this.fb.array([])
    });
  }

  // Helper to access the FormArray
  get lineItemsArray(): FormArray {
    return this.rexForm.get('lineItems') as FormArray;
  }

  addLineItem() {
    const itemGroup = this.fb.group({
      // 10 Line Item Sub-sections
      productDetails: this.fb.group({ productName: ['', Validators.required], cutType: [''] }),
      packagingMetrics: this.fb.group({ qty: [0], unit: ['Cartons'] }),
      usageDetails: this.fb.group({ intendedUse: ['Human Consumption'] }),
      deptRequirements: this.fb.group({ certCodes: [''] }),
      establishmentDetails: this.fb.group({ estNumber: [''] }),
      treatmentDetails: this.fb.group({ treatmentType: ['Chilled'] }),
      containerDetails: this.fb.group({ containerNo: [''], sealNo: [''] }),
      supportingDocs: this.fb.group({ docId: [''] }),
      certificateDetails: this.fb.group({ certType: [''] }),
      additionalDetails: this.fb.group({ remarks: [''] })
    });
    this.lineItemsArray.push(itemGroup);
  }

  removeLineItem(index: number, event: Event) {
    event.stopPropagation(); // Prevents accordion from toggling
    if (this.lineItemsArray.length > 1) {
      this.lineItemsArray.removeAt(index);
    } else {
      this.snackBar.open('A REX must have at least one line item.', 'OK', { duration: 2000 });
    }
  }

  loadRexData(id: string) {
    console.log(`Fetching REX ${id} from SQL Server...`);
    // Here you would call your RexService.getById(id)
  }

  onSave() {
    if (this.rexForm.valid) {
      console.log('Saving REX Data:', this.rexForm.value);
      this.snackBar.open('Progress Saved Successfully', 'Success');
    } else {
      this.snackBar.open('Please fix errors before saving', 'Error');
    }
  }

  goBack() {
    this.router.navigate(['/rex']);
  }
}