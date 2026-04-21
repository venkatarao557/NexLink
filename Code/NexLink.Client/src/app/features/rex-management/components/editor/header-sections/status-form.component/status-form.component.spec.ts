import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusFormComponent } from './status-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StatusFormComponent', () => {
  let component: StatusFormComponent;
  let fixture: ComponentFixture<StatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusFormComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusFormComponent);
    component = fixture.componentInstance;

    // Mocking the parent form group
    component.statusForm = new FormGroup({
      rfpStatus: new FormControl('INITIAL'),
      rfpNbr: new FormControl('123456'),
      exportPermitNbr: new FormControl(''),
      statusTimeStamp: new FormControl('20/04/2026 21:00'),
      lineItemCount: new FormControl(0),
      transferStatus: new FormControl('NOT TRANSFERRED')
    });

    fixture.detectChanges();
  });

  it('should create the status form component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the RFP Number in readonly mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[formControlName="rfpNbr"]');
    expect(input?.getAttribute('readonly')).toBeDefined();
  });
});