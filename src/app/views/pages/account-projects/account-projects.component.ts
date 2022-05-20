import { Component, OnInit } from '@angular/core';
import { slideUpAnimation, Animations } from 'src/app/class/animations';

@Component({
  selector: 'app-account-projects',
  templateUrl: './account-projects.component.html',
  styleUrls: ['./account-projects.component.scss'],
  animations: [ slideUpAnimation]
})
export class AccountProjectsComponent extends Animations implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
