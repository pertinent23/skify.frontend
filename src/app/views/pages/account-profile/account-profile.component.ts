import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  name = 'Nom';
  email = 'email';

  constructor(
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    const
      user = JSON.parse(
        this.cookie.get( 'user' )
      );
    this.name = user.name;
    this.email = user.email;
  }

}
