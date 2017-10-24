import { TestBed, inject } from '@angular/core/testing';

import { CanActivateAdminService } from './can-activate-admin.service';

describe('CanActivateAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAdminService]
    });
  });

  it('should ...', inject([CanActivateAdminService], (service: CanActivateAdminService) => {
    expect(service).toBeTruthy();
  }));
});
