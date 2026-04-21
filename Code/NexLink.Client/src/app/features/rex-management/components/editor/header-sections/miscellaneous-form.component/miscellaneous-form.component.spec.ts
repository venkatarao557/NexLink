import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscellaneousFormComponent } from './miscellaneous-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MiscFormComponent', () => {
  let component: MiscellaneousFormComponent;
  let fixture: ComponentFixture<MiscellaneousFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MiscellaneousFormComponent);
    component = fixture.componentInstance;

    component.miscForm = new FormGroup({
      hcPrintInd: new FormControl('AUTO'),
      quotaInd: new FormControl(false),
      quotaYear: new FormControl(''),
      sepByMarks: new FormControl(false),
      sepByPacker: new FormControl(false),
      sepByContainer: new FormControl(false)
    });

    fixture.detectChanges();
  });

  it('should create the miscellaneous form component', () => {
    expect(component).toBeTruthy();
  });

  it('should default the print indicator to AUTO', () => {
    expect(component.miscForm.get('hcPrintInd')?.value).toBe('AUTO');
  });
});