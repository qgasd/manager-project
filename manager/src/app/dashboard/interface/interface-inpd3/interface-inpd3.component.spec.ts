import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceInpd3Component } from './interface-inpd3.component';

describe('InterfaceInpd3Component', () => {
  let component: InterfaceInpd3Component;
  let fixture: ComponentFixture<InterfaceInpd3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceInpd3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceInpd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
