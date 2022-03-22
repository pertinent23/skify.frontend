import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeAnimation, Animations } from './class/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  animations: [ fadeAnimation ]
})
export class AppComponent extends Animations {
  title = 'skyfi';

  constructor( translate: TranslateService ) {
    super();
    translate.addLangs( [ 'en', 'fr' ] );
    translate.setDefaultLang( 'fr' );
    translate.use( 'fr' );
  }
}
