import { TestBed } from '@angular/core/testing';

import { FilledBasketGuard } from './filled-basket.guard';
import { HttpTestingController } from '@angular/common/http/testing'

describe('FilledBasketGuard', () => {
  let guard: FilledBasketGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController]
    });
    guard = TestBed.inject(FilledBasketGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
