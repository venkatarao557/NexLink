import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RexEditorComponent } from './rex-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('RexEditorComponent', () => {
  let component: RexEditorComponent;
  let fixture: ComponentFixture<RexEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RexEditorComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RexEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the main editor', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty line items array', () => {
    expect(component.lineItemsArray.length).toBe(0);
  });
});