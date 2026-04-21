import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertDetailsComponent } from './cert-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('CertDetailsComponent', () => {
  let component: CertDetailsComponent;
  let fixture: ComponentFixture<CertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CertDetailsComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CertDetailsComponent);
    component = fixture.componentInstance;

    component.certForm = new FormGroup({
      certificateNumber: new FormControl(''),
      templateId: new FormControl(''),
      issueDate: new FormControl(null),
      expiryDate: new FormControl(null),
      technicalStatement: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the certificate details component', () => {
    expect(component).toBeTruthy();
  });
});