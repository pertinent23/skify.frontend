import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.scss']
})
export class LogInputComponent implements OnInit, ControlValueAccessor {
  @Input() id = '';
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() input: string = '';
  @Output() inputChange: EventEmitter<string> = new EventEmitter();
  @ViewChild( 'field' ) node? : ElementRef;
  constructor() { }

  ngOnInit(): void {}


  _onChange: any = () => {}
  _onTouch: any = () => {}

  writeValue( value: any ) {
    if ( this.node ) {
      this.node.nativeElement.value = value;
    }
  }

  registerOnChange( fn: ( _: any ) => void ): void {
    this._onChange = fn;
  }

  registerOnTouched( fn: any ): void {
    this._onTouch = fn;
  }

  setDisabledState( isDisabled: boolean ): void {
    if ( this.node ) {
      this.node.nativeElement.setAttribute( 'disabled', isDisabled );
    }
  }
}
