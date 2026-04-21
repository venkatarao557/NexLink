import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionFormComponent } from './inspection-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('InspectionFormComponent', () => {
  let component: InspectionFormComponent;
  let fixture: ComponentFixture<InspectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InspectionFormComponent, 
        NoopAnimationsModule, 
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionFormComponent);
    component = fixture.componentInstance;

    component.inspectionForm = new FormGroup({
      establishmentId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      inspectionComment: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the inspection form component', () => {
    expect(component).toBeTruthy();
  });

  it('should list available establishments', () => {
    expect(component.establishments.length).toBeGreaterThan(0);
  });
});