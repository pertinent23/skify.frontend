import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class IsProjectGuard implements CanActivate {
  constructor(
    private db: DbService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( ( resolve, reject ) => {
      const
      id = parseInt( route.paramMap.get( 'id' ) || '0' );
      this.db.getProject( id ).then( data => {
        if ( !data ) {
          const
            lang = route.parent?.parent?.parent?.paramMap.get( 'lang' );
          this.router.navigate( [ `${ lang }/account/projects/list` ] );
        } else resolve( true );
      } ).catch( () => {
        reject();
      } )
    } );
  }

}
