import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { fadeAnimation, Animations } from 'src/app/class/animations';

@Component({
  selector: 'app-lang-base',
  templateUrl: './lang-base.component.html',
  styleUrls: ['./lang-base.component.scss'],
  animations: [ fadeAnimation ]
})
export class LangBaseComponent extends Animations implements OnInit {

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if ( 'lang' in params ) {
        this.translate.use( params[ 'lang' ] )
      }
    } )
  }
}
