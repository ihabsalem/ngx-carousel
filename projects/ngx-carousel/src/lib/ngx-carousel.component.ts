import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ContentChild,
  TemplateRef,
  AfterViewInit
} from '@angular/core';
import { NgxCarouselsConfig } from '../public_api';
import { WindowEventsService } from './window-events.service';
import { NgxMediaQuery } from '../models/carousel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-carousel',
  styleUrls: ['./ngx-carousel.component.scss'],
  template: `
    <div class="container-fluid">
      <div
        style="overflow: hidden;"
        class="carousel slide"
        data-ride="carousel"
      >
        <div
          #ngxCarousel
          id="ngxCarousel"
          class="carousel-inner row w-100 mx-auto flex-nowrap"
        >
          <div
            *ngFor="let item of dataSource"
            items-list
            class="h-100 carousel-item {{ item }} slide col-md-{{
              12 / numberOfCardsPerPage
            }}"
          >
            <ng-template
              [ngTemplateOutlet]="itemTemplate"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-template>
            <ng-content select="[ngx-item]"></ng-content>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          (click)="pre()"
          role="button"
          data-slide="prev"
        >
          {{ numberOfCardsPerPage }}
          <ng-content select="[pre-items]"></ng-content>
        </a>
        <a
          class="carousel-control-next"
          (click)="next($event)"
          role="button"
          data-slide="next"
        >
          <ng-content select="[next-items]"></ng-content>
        </a>
      </div>
    </div>
  `
})
export class NgxCarouselComponent implements AfterViewInit, OnInit {
  state = '';
  @Input() config: NgxCarouselsConfig;
  @Input() dataSource: any[];
  currentActivePageIndex = 0;
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  @ViewChild('ngxCarousel') ngxCarousel: ElementRef;
  numberOfCardsPerPage = 4;
  width = 412;
  constructor(private windowEventsService: WindowEventsService) {}

  ngOnInit(): void {
    this.windowEventsService.dimensions$.subscribe(dimention => {
      const minWidth = dimention.width;
      this.setNumberOfItemsOnResizing(minWidth);
    });
  }
  ngAfterViewInit(): void {
    this.setNumberOfItemsOnResizing(this.windowEventsService.getWindowWidth());

    console.log(this.ngxCarousel.nativeElement.children);
  }

  setNumberOfItemsOnResizing(minWidth) {
    if (!this.config) {
      return;
    }
    console.log('---', this.numberOfCardsPerPage, this.config);

    if (minWidth <= NgxMediaQuery.XS) {
      this.numberOfCardsPerPage = this.config.grid.xs;
      console.log('00', this.numberOfCardsPerPage, this.config);
      return;
    }
    if (minWidth <= NgxMediaQuery.SM) {
      this.numberOfCardsPerPage = this.config.grid.sm;
      console.log('11', this.numberOfCardsPerPage, this.config);
      return;
    }
    if (minWidth <= NgxMediaQuery.LG) {
      this.numberOfCardsPerPage = this.config.grid.lg;
      console.log('22', this.numberOfCardsPerPage, this.config);
      return;
    }
    if (minWidth <= NgxMediaQuery.XL) {
      this.numberOfCardsPerPage = this.config.grid.xl;
      console.log('mi32nwi', this.numberOfCardsPerPage, this.config);
      return;
    }
  }

  next(event) {
    const totalItems = (this.ngxCarousel.nativeElement as HTMLElement).children
      .length;

    let nextActivePageIndex =
      this.currentActivePageIndex + this.config.slidePerScroll;

    if (nextActivePageIndex > totalItems) {
      nextActivePageIndex = 0;
    }
    if (nextActivePageIndex > totalItems - this.currentActivePageIndex) {
      nextActivePageIndex = totalItems - 1;
    }
    this.currentActivePageIndex = nextActivePageIndex;

    // this.ngxCarousel.nativeElement.scrollLeft =
    // ((this.ngxCarousel.nativeElement as HTMLElement).children[this.currentActivePageIndex] as any).offsetLeft;
    console.log(this.currentActivePageIndex);
    const x = this.ngxCarousel.nativeElement;
    for (let index = 0; index < this.numberOfCardsPerPage; index++) {
      const elem: HTMLElement = x.children[index];
      console.log(elem);
      elem.classList.add('animation');
      setTimeout(() => {
        elem.classList.remove('animation');
        x.insertBefore(elem, x.children[x.children.length - 1]);
      }, 1450);
    }
  }

  pre() {
    const totalItems = (this.ngxCarousel.nativeElement as HTMLElement).children
      .length;
    let nextActivePageIndex =
      this.currentActivePageIndex - this.config.slidePerScroll;
    console.log(nextActivePageIndex);
    if (
      nextActivePageIndex < 0 &&
      this.currentActivePageIndex + nextActivePageIndex >= 0
    ) {
      nextActivePageIndex = 0;
    }
    if (nextActivePageIndex < 0) {
      nextActivePageIndex = totalItems - this.config.slidePerScroll;
    }

    this.currentActivePageIndex = nextActivePageIndex;
    // this.ngxCarousel.nativeElement.scrollLeft =
    //   ((this.ngxCarousel.nativeElement as HTMLElement).children[this.currentActivePageIndex] as any).offsetLeft;
    const x = this.ngxCarousel.nativeElement;
    for (let index = 0; index < this.numberOfCardsPerPage; index++) {
      const elem: HTMLElement = x.children[index];
      console.log(elem);
      elem.classList.add('animation-reverse');
      setTimeout(() => {
        elem.classList.remove('animation-reverse');

        x.insertBefore(x.children[x.children.length - 1], elem);
      }, 1450);
    }
    this.state = this.state + 1;
  }
}
