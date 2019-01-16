import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigWindowGroupbyComponent } from './config-window-groupby.component';

describe('ConfigWindowGroupbyComponent', () => {
  let component: ConfigWindowGroupbyComponent;
  let fixture: ComponentFixture<ConfigWindowGroupbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWindowGroupbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWindowGroupbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
