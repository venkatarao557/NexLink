import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentDetailsComponent } from './treatment-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('TreatmentDetailsComponent', () => {
  let component: TreatmentDetailsComponent;
  let fixture: ComponentFixture<TreatmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TreatmentDetailsComponent, 
        NoopAnimationsModule, 
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentDetailsComponent);
    component = fixture.componentInstance;

    component.treatmentForm = new FormGroup({
      treatmentType: new FormControl(''),
      treatmentName: new FormControl(''),
      concentration: new FormControl(''),
      duration: new FormControl(null),
      temperature: new FormControl(''),
      treatmentDate: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create the treatment details component', () => {
    expect(component).toBeTruthy();
  });
});