import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { privadoGuard } from './privado.guard';

describe('privadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => privadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
