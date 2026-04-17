import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RexEditorComponent } from './rex-editor.component';

describe('RexEditorComponent', () => {
  let component: RexEditorComponent;
  let fixture: ComponentFixture<RexEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RexEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RexEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
