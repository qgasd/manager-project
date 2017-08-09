import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceRefrenceComponent } from './interface-refrence.component';

describe('InterfaceRefrenceComponent', () => {
  let component: InterfaceRefrenceComponent;
  let fixture: ComponentFixture<InterfaceRefrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceRefrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceRefrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
