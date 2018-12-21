import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-carousel',
  styles: [`
  .carousel-inner {
    scroll-behavior: smooth;
  }
  `],
  template: `
  <div class="container-fluid">
  <div style="overflow: hidden;" class="carousel slide" data-ride="carousel">
    <div #ngxCarousel id="ngxCarousel" class="carousel-inner row w-100 mx-auto flex-nowrap">
      <ng-content select="[items-list]"></ng-content>
    </div>
    <a class="carousel-control-prev" (click)="pre()" role="button" data-slide="prev">
      <ng-content select="[pre-items]"></ng-content>
    </a>
    <a class="carousel-control-next" (click)="next()" role="button" data-slide="next">
      <ng-content select="[next-items]"></ng-content>
    </a>
  </div>
</div>

  `
})
export class NgxCarouselComponent {
  currentActivePageIndex = 0;
  itemPerPage = 4;

  @ViewChild('ngxCarousel') ngxCarousel: ElementRef;

  next() {
    const totalItems = (this.ngxCarousel.nativeElement as HTMLElement).children.length;
    let nextActivePageIndex = this.currentActivePageIndex + this.itemPerPage;
    if (nextActivePageIndex >= (totalItems)) {
      nextActivePageIndex = 0;
    }
    if (nextActivePageIndex > (totalItems - this.currentActivePageIndex)) {
      nextActivePageIndex = totalItems - 1;
    }
    this.currentActivePageIndex = nextActivePageIndex;
    this.ngxCarousel.nativeElement.scrollLeft =
      ((this.ngxCarousel.nativeElement as HTMLElement).children[this.currentActivePageIndex] as any).offsetLeft;

  }
  pre() {
    const totalItems = (this.ngxCarousel.nativeElement as HTMLElement).children.length;
    let nextActivePageIndex = this.currentActivePageIndex - this.itemPerPage;
    console.log(nextActivePageIndex);
    if (nextActivePageIndex < 0 && this.currentActivePageIndex + nextActivePageIndex >= 0) {
      nextActivePageIndex = 0;
    }
    if (nextActivePageIndex < 0) {
      nextActivePageIndex = (totalItems - 1) - this.itemPerPage;
    }

    this.currentActivePageIndex = nextActivePageIndex;
    this.ngxCarousel.nativeElement.scrollLeft =
      ((this.ngxCarousel.nativeElement as HTMLElement).children[this.currentActivePageIndex] as any).offsetLeft;
  }
}
