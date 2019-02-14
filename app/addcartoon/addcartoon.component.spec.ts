import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcartoonComponent } from './addcartoon.component';

describe('AddcartoonComponent', () => {
  let component: AddcartoonComponent;
  let fixture: ComponentFixture<AddcartoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcartoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcartoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
