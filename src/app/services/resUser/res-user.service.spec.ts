import { TestBed } from '@angular/core/testing';

import { ResUserService } from './res-user.service';

describe('ResUserService', () => {
  let service: ResUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
