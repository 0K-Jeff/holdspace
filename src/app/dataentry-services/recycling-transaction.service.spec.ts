import { TestBed } from '@angular/core/testing';

import { RecyclingTransactionService } from './recycling-transaction.service';

describe('RecyclingTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecyclingTransactionService = TestBed.get(RecyclingTransactionService);
    expect(service).toBeTruthy();
  });
});
