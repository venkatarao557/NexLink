import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipHoldFormComponent } from './ship-hold-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('ShipHoldFormComponent', () => {
  let component: ShipHoldFormComponent;
  let fixture: ComponentFixture<ShipHoldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShipHoldFormComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipHoldFormComponent);
    component = fixture.componentInstance;

    component.shipHoldForm = new FormGroup({
      compartments: new FormControl(''),
      inspectionDate: new FormControl(null),
      inspectionPort: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the ship hold form component', () => {
    expect(component).toBeTruthy();
  });

  it('should allow entering compartment information', () => {
    const control = component.shipHoldForm.get('compartments');
    control?.setValue('HOLD 1, HOLD 2');
    expect(control?.value).toEqual('HOLD 1, HOLD 2');
  });
});