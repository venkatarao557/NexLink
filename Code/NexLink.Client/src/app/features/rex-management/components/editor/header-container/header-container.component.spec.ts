import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderContainerComponent } from './header-container.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderContainerComponent', () => {
  let component: HeaderContainerComponent;
  let fixture: ComponentFixture<HeaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderContainerComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderContainerComponent);
    component = fixture.componentInstance;

    // Initialize the Input FormGroup to match component expectations
    component.headerForm = new FormGroup({
      status: new FormGroup({
        rexNumber: new FormControl(''),
        status: new FormControl('DRAFT')
      }),
      parties: new FormGroup({
        consigneeName: new FormControl(''),
        consigneeAddress: new FormControl('')
      }),
      shipping: new FormGroup({
        vesselName: new FormControl('')
      })
    });

    fixture.detectChanges();
  });

  it('should create the header orchestrator', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve nested form groups correctly', () => {
    const statusGroup = component.getGroup('status');
    expect(statusGroup).toBeDefined();
    expect(statusGroup.get('status')?.value).toBe('DRAFT');
  });

  it('should render the vertical stepper', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-stepper')).toBeTruthy();
  });
});