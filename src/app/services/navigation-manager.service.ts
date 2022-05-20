import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationManagerService {
  title: string = '';
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  setPageTitle( val: string ) {
    const
      title = document.getElementsByTagName( 'title' )[ 0 ];
    if ( title ) {
      title.textContent = val;
      this.title = val;
    }
  }

  setLang( lang: string ) : void {
    if ( this.translate.getLangs().find( l => lang === l ) ) {
      const
        parts = this.router.url.split( '/' );
        parts[ 1 ] = lang;
      this.router.navigate( [
        parts.join( '/' )
      ] );
    }
  }
}
