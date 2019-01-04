import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WindowEventsService {

  // height$: Observable<number>;
  // width$: Observable<number>;
  dimensions$: Observable<Dimensions>;
  // create more Observables as and when needed for various properties
  click$: Observable<Dimensions>;

  constructor() {
    const windowSize$ = new BehaviorSubject(getWindowSize());

    const documntClick$ = new BehaviorSubject(getDocumentClick(undefined));

    fromEvent(document, 'click')
      .pipe(map(getDocumentClick),
        map(res => res.target))
      .subscribe(documntClick$);

    this.click$ = (documntClick$).pipe(distinctUntilChanged());
    // this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
    // this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();
    this.dimensions$ = (windowSize$).pipe(distinctUntilChanged());

    fromEvent(window, 'resize')
      .pipe(map(getWindowSize))
      .subscribe(windowSize$);
  }
  getWindowWidth() {
    return getWindowSize().width;
  }

}

function getWindowSize(): Dimensions {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
}
function getDocumentClick(event) {
  return event;
}
export interface Dimensions {
  width;
  height;
}
