import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartoonComponent } from './my-cartoon.component';

describe('MyCartoonComponent', () => {
  let component: MyCartoonComponent;
  let fixture: ComponentFixture<MyCartoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
