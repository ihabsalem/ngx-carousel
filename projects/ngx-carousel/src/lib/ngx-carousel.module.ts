import { NgModule } from '@angular/core';
import { NgxCarouselComponent } from './ngx-carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxCarouselComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxCarouselComponent]
})
export class NgxCarouselModule { }
