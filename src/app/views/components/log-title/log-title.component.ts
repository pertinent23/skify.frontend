import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-title',
  templateUrl: './log-title.component.html',
  styleUrls: ['./log-title.component.scss']
})
export class LogTitleComponent implements OnInit {
  @Input() title: string = '';
  constructor() { }

  ngOnInit(): void {}
}
