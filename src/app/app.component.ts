import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgxCarouselLibrary';
  itemList = [];
  constructor(){
    for (let index = 0; index < 64; index++) {
      this.itemList.push(index + 1);
    }
  }
}
