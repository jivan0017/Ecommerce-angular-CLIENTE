import { Component } from '@angular/core';

declare var $:any;
declare function initPageEcommerce([]):any;


@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent {

  constructor() {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }

}
