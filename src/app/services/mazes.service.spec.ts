import { TestBed } from '@angular/core/testing';

import { MazesService } from './mazes.service';

describe('MazesService', () => {
  let service: MazesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
