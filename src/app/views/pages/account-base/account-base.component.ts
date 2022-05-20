import { Component, OnInit } from '@angular/core';
import { slideUpAnimation, Animations } from 'src/app/class/animations';
import { NavigationManagerService } from 'src/app/services/navigation-manager.service';

@Component({
  selector: 'app-account-base',
  templateUrl: './account-base.component.html',
  styleUrls: ['./account-base.component.scss'],
  animations: [ slideUpAnimation ]
})
export class AccountBaseComponent extends Animations implements OnInit {

  constructor(
    private nav: NavigationManagerService
  ) {
    super();
  }

  ngOnInit(): void {}

  logOut() {}

  getTitle(): string {
    return this.nav.title;
  }
}
