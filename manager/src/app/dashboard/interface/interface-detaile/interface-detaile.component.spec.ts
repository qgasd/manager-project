import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceDetaileComponent } from './interface-detaile.component';

describe('InterfaceDetaileComponent', () => {
  let component: InterfaceDetaileComponent;
  let fixture: ComponentFixture<InterfaceDetaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceDetaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
