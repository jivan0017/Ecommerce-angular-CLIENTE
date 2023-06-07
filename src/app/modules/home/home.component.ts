import { Component } from '@angular/core';

declare var $: any;
declare function initPageEcommerce([]): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }
}
