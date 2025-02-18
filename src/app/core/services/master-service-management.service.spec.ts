import { TestBed } from '@angular/core/testing';

import { MasterServiceManagementService } from './master-service-management.service';

describe('MasterServiceManagementService', () => {
  let service: MasterServiceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterServiceManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
