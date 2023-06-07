import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: any = null;

  constructor(
    public authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.user = this.authService.user;
    console.log(">>> ", this.user)
  }

  logout() {
    this.authService.logout();
  }
}
