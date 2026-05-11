import { TestBed } from '@angular/core/testing';

import { ServicioService } from './servicio';

describe('Servicio', () => {
let service: ServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
