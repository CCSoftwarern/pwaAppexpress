import { TestBed } from '@angular/core/testing';

import { ServiceEntregaService } from './service-entrega.service';

describe('ServiceEntregaService', () => {
  let service: ServiceEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
