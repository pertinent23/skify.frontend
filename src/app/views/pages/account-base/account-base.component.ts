import { Component, OnInit } from '@angular/core';
import { slideUpAnimation, Animations } from 'src/app/class/animations';

@Component({
  selector: 'app-account-base',
  templateUrl: './account-base.component.html',
  styleUrls: ['./account-base.component.scss'],
  animations: [ slideUpAnimation ]
})
export class AccountBaseComponent extends Animations implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
