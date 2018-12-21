import { TestBed } from '@angular/core/testing';

import { NgxCarouselService } from './ngx-carousel.service';

describe('NgxCarouselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCarouselService = TestBed.get(NgxCarouselService);
    expect(service).toBeTruthy();
  });
});
