import { TestBed } from '@angular/core/testing';

import { PathfindService } from './pathfind.service';

describe('PathfindService', () => {
  let service: PathfindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathfindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
