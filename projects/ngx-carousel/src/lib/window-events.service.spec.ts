import { TestBed } from '@angular/core/testing';

import { WindowEventsService } from './window-events.service';

describe('WindowEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowEventsService = TestBed.get(WindowEventsService);
    expect(service).toBeTruthy();
  });
});
