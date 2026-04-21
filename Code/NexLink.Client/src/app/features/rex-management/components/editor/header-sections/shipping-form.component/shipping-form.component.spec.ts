import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingFormComponent } from './shipping-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShippingFormComponent, 
        NoopAnimationsModule, 
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingFormComponent);
    component = fixture.componentInstance;

    component.shippingForm = new FormGroup({
      destCountry: new FormControl(''),
      destCity: new FormControl(''),
      transportMode: new FormControl(''),
      vesselName: new FormControl(''),
      voyageFlightNbr: new FormControl(''),
      departureDate: new FormControl(null),
      loadingPort: new FormControl(''),
      dischargePort: new FormControl(''),
      shipStoresInd: new FormControl(false)
    });

    fixture.detectChanges();
  });

  it('should create the shipping form', () => {
    expect(component).toBeTruthy();
  });
});