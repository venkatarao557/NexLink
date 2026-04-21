import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalDetailsComponent } from './additional-details.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AdditionalDetailsComponent', () => {
  let component: AdditionalDetailsComponent;
  let fixture: ComponentFixture<AdditionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalDetailsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalDetailsComponent);
    component = fixture.componentInstance;
    
    // Setup initial FormArray for test
    component.additionalDetailsArray = new FormArray<any>([]);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a row when addRow is called', () => {
    component.addRow();
    expect(component.additionalDetailsArray.length).toBe(1);
    expect(component.dataSource.data.length).toBe(1);
  });
});