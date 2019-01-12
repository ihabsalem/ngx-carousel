import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselComponent } from './ngx-carousel.component';

@NgModule({
  declarations: [NgxCarouselComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxCarouselComponent]
})
export class NgxCarouselModule { }
