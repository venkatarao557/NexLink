import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeptRequirementsComponent } from './dept-requirements.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DeptRequirementsComponent', () => {
  let component: DeptRequirementsComponent;
  let fixture: ComponentFixture<DeptRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeptRequirementsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeptRequirementsComponent);
    component = fixture.componentInstance;

    component.deptReqForm = new FormGroup({
      healthCertReq: new FormControl(''),
      importPermitNbr: new FormControl(''),
      organicInd: new FormControl(false),
      halalInd: new FormControl(false),
      gmInd: new FormControl(false),
      deptDeclaration: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the department requirements component', () => {
    expect(component).toBeTruthy();
  });
});