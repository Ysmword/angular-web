import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartoonDetailComponent } from './my-cartoon-detail.component';

describe('MyCartoonDetailComponent', () => {
  let component: MyCartoonDetailComponent;
  let fixture: ComponentFixture<MyCartoonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartoonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartoonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
