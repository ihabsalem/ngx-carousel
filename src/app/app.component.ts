import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { NgxCarouselsConfig } from 'projects/ngx-carousel/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'NgxCarouselLibrary';
  @ViewChild('carousel') ngxCarousel: ElementRef;
  @ViewChildren('carouselItem') carouselItem: QueryList<HTMLElement>;
  itemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  config: NgxCarouselsConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
    slidePerScroll: 2,
  };

  ngAfterViewInit(): void {

  }
  next() {

    const x = this.ngxCarousel.nativeElement;
    for (let index = 0; index < 4; index++) {
      x.insertBefore(x.children[0], x.children[x.children.length - 1]);
    }
  }
  ngOnInit(): void {

  }

}
