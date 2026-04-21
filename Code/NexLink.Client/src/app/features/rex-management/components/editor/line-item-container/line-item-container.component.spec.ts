import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineItemContainerComponent } from './line-item-container.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LineItemContainerComponent', () => {
  let component: LineItemContainerComponent;
  let fixture: ComponentFixture<LineItemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineItemContainerComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LineItemContainerComponent);
    component = fixture.componentInstance;

    // Initialize the Input FormArray
    component.lineItems = new FormArray<any>([]);

    fixture.detectChanges();
  });

  it('should create the line item orchestrator', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new line item to the array', () => {
    component.addLineItem();
    expect(component.lineItems.length).toBe(1);
    
    // Verify internal structure of the new line item
    const newItem = component.lineItems.at(0);
    expect(newItem.get('productDetails')).toBeTruthy();
    expect(newItem.get('additionalCerts')).toBeInstanceOf(FormArray);
  });

  it('should remove a line item after confirmation', () => {
    // Mock the confirm dialog
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.addLineItem(); // Add one
    expect(component.lineItems.length).toBe(1);
    
    component.removeLineItem(0); // Remove it
    expect(component.lineItems.length).toBe(0);
  });

  it('should not remove a line item if user cancels confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.addLineItem();
    component.removeLineItem(0);
    expect(component.lineItems.length).toBe(1);
  });

  it('should display the empty state when no items exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });
});