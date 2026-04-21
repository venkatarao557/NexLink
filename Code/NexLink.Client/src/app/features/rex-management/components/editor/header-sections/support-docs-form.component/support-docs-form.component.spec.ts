import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportDocsFormComponent } from './import-docs-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('ImportDocsFormComponent', () => {
  let component: ImportDocsFormComponent;
  let fixture: ComponentFixture<ImportDocsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ImportDocsFormComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportDocsFormComponent);
    component = fixture.componentInstance;

    component.importDocsForm = new FormGroup({
      importDocNbr: new FormControl(''),
      importDocDate: new FormControl(null),
      recommendationLetterInd: new FormControl(false)
    });

    fixture.detectChanges();
  });

  it('should create the import docs form component', () => {
    expect(component).toBeTruthy();
  });

  it('should allow toggling the recommendation letter indicator', () => {
    const control = component.supportDocsForm.get('recommendationLetterInd');
    control?.setValue(true);
    expect(control?.value).toBe(true);
  });
});