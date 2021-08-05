import { TestBed } from '@angular/core/testing';

import { TopKService } from './top-k.service';

describe('TopKService', () => {
  let service: TopKService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopKService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
