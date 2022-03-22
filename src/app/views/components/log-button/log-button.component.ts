import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-button',
  templateUrl: './log-button.component.html',
  styleUrls: ['./log-button.component.scss']
})
export class LogButtonComponent implements OnInit {
  @Input() label : string = '';
  constructor() { }

  ngOnInit(): void {}
}
