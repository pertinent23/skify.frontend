import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountProjectsSecondComponent, Options } from '../account-projects-second/account-projects-second.component';

export interface OptionsServices extends Options{
  pa?: number;
  ts?: number;
  bp?: number;
};

@Component({
  selector: 'app-account-projects-third',
  templateUrl: './account-projects-third.component.html',
  styleUrls: ['./account-projects-third.component.scss']
})
export class AccountProjectsThirdComponent extends AccountProjectsSecondComponent implements OnInit {
  override link = '../../second';
  override key = 'third'
  override subkey = 'services';

  override data: OptionsServices[] = [];
  override options : OptionsServices[] = [
    { id: 1, value: 'Video sur demande' },
    { id: 2, value: 'Video conférence' },
    { id: 3, value: 'Web browsing' },
    { id: 4, value: 'Chating' },
    { id: 5, value: 'E-Mail' },
    { id: 6, value: 'VPN' },
    { id: 7, value: 'FTP' }
  ];

  override current: FormGroup = new FormGroup( {
    nc: new FormControl( 0 ),
    nps: new FormControl( 0 ),
    nac: new FormControl( 0 ),
    bpap: new FormControl( 0 )
  } );

  override subCurrent: FormGroup = new FormGroup( {
    pa: new FormControl( 0 ),
    ts: new FormControl( 0 ),
    bp: new FormControl( 0 )
  } );

  getBP(): number {
    let
      final = 0;
        for( const item of this.data )
          final += ( item.pa || 0 ) * ( item.ts || 0 ) * ( item.bp || 0 );
    return final;
  }

  getNS() : number{
    const
      { nps, bpap } = this.current.value;
    return Math.ceil( bpap / ( nps || 1 ) );
  }

  getNAP() : number {
    const
      { bpap } = this.current.value;
    return Math.ceil( bpap / (this.getBP()||1) );
  }

  getNTAP() : number {
    const
      { nc } = this.current.value;
    return this.getNAP() * nc;
  }
}
