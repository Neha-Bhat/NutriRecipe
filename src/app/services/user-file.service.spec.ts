import { TestBed } from '@angular/core/testing';

import { UserFileService } from './user-file.service';

describe('UserFileService', () => {
  let service: UserFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
