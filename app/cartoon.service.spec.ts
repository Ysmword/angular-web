import { TestBed } from '@angular/core/testing';

import { CartoonService } from './cartoon.service';

describe('CartoonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartoonService = TestBed.get(CartoonService);
    expect(service).toBeTruthy();
  });
});
