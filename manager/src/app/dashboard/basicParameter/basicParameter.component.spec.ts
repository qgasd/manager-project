import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicParameterComponent } from './basicParameter.component';

describe('BasicParameterComponent', () => {
  let component: BasicParameterComponent;
  let fixture: ComponentFixture<BasicParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
