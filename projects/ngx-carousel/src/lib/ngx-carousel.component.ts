import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ContentChild,
  TemplateRef,
  AfterViewInit,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { NgxCarouselsConfig } from '../public_api';
import { WindowEventsService } from './window-events.service';
import { NgxMediaQuery } from '../models/carousel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-carousel',
  styleUrls: ['./ngx-carousel.component.scss'],
  template: `
    <div class="carousel">
      <div
        #ngxCarousel
        id="ngxCarousel"
        class="carousel-inner   w-100 mx-auto flex-nowrap"
      >
        <div
          *ngFor="let item of dataSource"
          items-list
          class="h-100 carousel-item {{ item }} slide"
          [style.marginLeft.px]="cardOffset"
          [style.marginRight.px]="cardOffset"
          [style.minWidth.px]="cardWidth"
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
  `
})
export class NgxCarouselComponent implements AfterViewInit, OnInit, OnChanges {
  state = '';
  @Input() config: NgxCarouselsConfig;
  @Input() dataSource: any[];
  currentActivePageIndex = 0;
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  @ViewChild('ngxCarousel') ngxCarousel: ElementRef;
  numberOfCardsPerPage = 5;
  cardWidth = 0;
  cardOffset = 0;
  constructor(private windowEventsService: WindowEventsService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.calculateCardDimentions();
  }
  OnChanges(changes: SimpleChanges): void {
    this.calculateCardDimentions();
  }

  ngOnInit(): void {
    this.windowEventsService.dimensions$.subscribe(dimention => {
      const minWidth = dimention.width;
      this.setNumberOfItemsOnResizing(minWidth);
    });
  }
  ngAfterViewInit(): void {
    this.setNumberOfItemsOnResizing(this.windowEventsService.getWindowWidth());
    this.calculateCardDimentions();

    // Listen to changes on the elements in the page that affect layout
    const observer = new MutationObserver(() => {
      console.log('element width changed, so we are setting the dimentions');
      this.setNumberOfItemsOnResizing(
        this.windowEventsService.getWindowWidth()
      );
    });
    if (
      (this.ngxCarousel.nativeElement as HTMLElement).parentElement
        .parentElement.parentElement
    ) {
      observer.observe(
        (this.ngxCarousel.nativeElement as HTMLElement).parentElement
          .parentElement.parentElement,
        {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        }
      );
    }
    observer.observe(
      (this.ngxCarousel.nativeElement as HTMLElement).parentElement
        .parentElement,
      {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      }
    );
  }
  calculateCardDimentions() {
    const width = (this.ngxCarousel.nativeElement as HTMLElement).clientWidth;
    console.log('width, width', width);
    this.cardWidth =
      width / this.numberOfCardsPerPage -
      (this.config.marginBetweenCards || 20);
    this.cardOffset = this.config.marginBetweenCards
      ? this.config.marginBetweenCards / 2
      : 10;
  }
  setNumberOfItemsOnResizing(minWidth) {
    if (!this.config) {
      return;
    }

    if (minWidth <= NgxMediaQuery.XS) {
      this.numberOfCardsPerPage = this.config.grid.xs;
      console.log('00', this.numberOfCardsPerPage, this.config);
      this.calculateCardDimentions();

      return;
    }
    if (minWidth <= NgxMediaQuery.SM) {
      this.numberOfCardsPerPage = this.config.grid.sm;
      console.log('11', this.numberOfCardsPerPage, this.config);
      this.calculateCardDimentions();

      return;
    }
    if (minWidth <= NgxMediaQuery.LG) {
      this.numberOfCardsPerPage = this.config.grid.lg;
      console.log('22', this.numberOfCardsPerPage, this.config);
      this.calculateCardDimentions();

      return;
    }
    this.numberOfCardsPerPage = this.config.grid.xl;
    this.calculateCardDimentions();
    console.log('mi32nwi', this.numberOfCardsPerPage, this.config);
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
