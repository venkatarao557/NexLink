import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExporterFormComponent } from './exporter-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExporterFormComponent', () => {
  let component: ExporterFormComponent;
  let fixture: ComponentFixture<ExporterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExporterFormComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ExporterFormComponent);
    component = fixture.componentInstance;

    component.exporterForm = new FormGroup({
      exporterId: new FormControl(null),
      exporterRef: new FormControl(''),
      expDeclaration: new FormControl(''),
      ediUser: new FormControl(''),
      productGroup: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the exporter form', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided exporters list', () => {
    expect(component.exporters.length).toBeGreaterThan(0);
  });
});