import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineItemDocumentsComponent } from './line-item-documents.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('LineItemDocumentsComponent', () => {
  let component: LineItemDocumentsComponent;
  let fixture: ComponentFixture<LineItemDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LineItemDocumentsComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LineItemDocumentsComponent);
    component = fixture.componentInstance;

    component.docsForm = new FormGroup({
      docTypeCode: new FormControl(''),
      docReference: new FormControl(''),
      issuingAuthority: new FormControl(''),
      issueDate: new FormControl(null),
      isElectronic: new FormControl(false)
    });

    fixture.detectChanges();
  });

  it('should create the documents component', () => {
    expect(component).toBeTruthy();
  });
});