import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.scss']
})
export class LogInputComponent implements OnInit {
  @Input() id = '';
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() input: string = '';
  @Output() inputChange: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {}
}
