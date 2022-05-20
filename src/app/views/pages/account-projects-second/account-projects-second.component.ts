import { Component, OnInit } from '@angular/core';
import { AccountProjectsFirstComponent } from '../account-projects-first/account-projects-first.component';
import { FormGroup, FormControl } from '@angular/forms';

export interface Options{
  id: number;
  value: string;
  at?: number;
  nfp?: number;
};

@Component({
  selector: 'app-account-projects-second',
  templateUrl: './account-projects-second.component.html',
  styleUrls: ['./account-projects-second.component.scss']
})
export class AccountProjectsSecondComponent extends AccountProjectsFirstComponent implements OnInit {
  override key : string = 'second';
  override link : string = '../../third';
  subkey = 'obstacles';
  data: Options[] = [];
  selected: number[] = [];
  options : Options[] = [
    { id: 1, value: 'Mûr de Briques à double cloison' },
    { id: 2, value: 'Mûr de Brique à simple cloison' },
    { id: 3, value: 'Vitre (en verre)' },
    { id: 4, value: 'Rideau d’arbres' },
    { id: 5, value: 'Corps humain' },
  ];

  override current: FormGroup = new FormGroup( {
    area: new FormControl( 0, [ ] ),
  } );

  subCurrent: FormGroup = new FormGroup( {
    at: new FormControl( 0, [ ] ),
    nfp: new FormControl( 0, [ ] )
  } );

  addSelected( id: string ) : void {
    const
      key = parseInt( id );
    this.selected.push( key );
    this.data.push( {
      ...this.options.find( item => item.id === key ),
      ...this.subCurrent.value
    } );
    this.save();
  }

  override async fillInputs( data: Record<string, any> ) {
    const
      details: Record<string, any> = {};
        for( let item in data ) {
          if ( item !== this.subkey )
            details[ item ] = data[ item ];
        }
    super.fillInputs( details );
    this.selected = ( data[ this.subkey ] || [] ).map( ( item: Options ) => item.id );
    this.data = data[ this.subkey ] || [];
  }

  override getValue() : Record<string, any> {
    return {
      ...super.getValue(),
      [ this.subkey ]: this.data
    };
  }

  removeSelected( id: number ) : void {
    this.selected = this.selected.filter( val => val !== id );
    this.data = this.data.filter( item => item.id !== id );
    this.save();
  }

  getNotSelected() : Options[] {
    return this.options.filter( val => this.selected.indexOf( val.id ) === -1 );
  }

  getSelected() : Options[] {
    return this.options.filter( val => this.selected.indexOf( val.id ) !== -1 );
  }

  getNC() : number {
    const
      { area } = this.current.value;
    return Math.ceil(
      area / ( Math.PI * Math.pow( this.getR(), 2 ) )
    );
  }

  getATMP() : number {
    let
      final = 0;
        for( const item of this.data )
          final += ( item.nfp || 0 ) * ( item.at || 0 );
    return Math.ceil( this.getAT() - final );
  }
}
