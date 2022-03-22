import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-subtitle',
  templateUrl: './log-subtitle.component.html',
  styleUrls: ['./log-subtitle.component.scss']
})
export class LogSubtitleComponent implements OnInit {
  @Input() subtitle : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
