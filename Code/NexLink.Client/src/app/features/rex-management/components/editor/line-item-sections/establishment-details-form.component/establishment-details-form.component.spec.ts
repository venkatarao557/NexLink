import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstablishmentDetailsComponent } from './establishment-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('EstablishmentDetailsComponent', () => {
  let component: EstablishmentDetailsComponent;
  let fixture: ComponentFixture<EstablishmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EstablishmentDetailsComponent, 
        NoopAnimationsModule, 
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishmentDetailsComponent);
    component = fixture.componentInstance;

    component.establishmentForm = new FormGroup({
      sourceEstabNbr: new FormControl(''),
      slaughterEstabNbr: new FormControl(''),
      preparationEstabNbr: new FormControl(''),
      storageEstabNbr: new FormControl(''),
      startProcessingDate: new FormControl(null),
      endProcessingDate: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create the establishment details component', () => {
    expect(component).toBeTruthy();
  });
});