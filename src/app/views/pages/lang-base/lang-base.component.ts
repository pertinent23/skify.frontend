import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lang-base',
  templateUrl: './lang-base.component.html',
  styleUrls: ['./lang-base.component.scss']
})
export class LangBaseComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if ( 'lang' in params ) {
        this.translate.use( params[ 'lang' ] )
      }
    } )
  }
}
