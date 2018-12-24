import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdEditorWidgetComponent } from './md-editor-widget.component';

describe('MdEditorWidgetComponent', () => {
  let component: MdEditorWidgetComponent;
  let fixture: ComponentFixture<MdEditorWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdEditorWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdEditorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
