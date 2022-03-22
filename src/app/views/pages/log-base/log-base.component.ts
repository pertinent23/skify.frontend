import { Component, OnInit } from '@angular/core';
import { slideUpAnimation, Animations } from 'src/app/class/animations';

@Component({
  selector: 'app-log-base',
  templateUrl: './log-base.component.html',
  styleUrls: ['./log-base.component.scss'],
  animations: [ slideUpAnimation ]
})
export class LogBaseComponent extends Animations implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
