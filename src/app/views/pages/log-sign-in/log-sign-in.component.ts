import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-sign-in',
  templateUrl: './log-sign-in.component.html',
  styleUrls: ['./log-sign-in.component.scss']
})
export class LogSignInComponent implements OnInit {
  error = '';
  user = new FormGroup( {
    email: new FormControl( '', [
      Validators.required,
      Validators.email
    ] ),
    password: new FormControl( '', [
      Validators.required,
      Validators.minLength( 5 )
    ] )
  } );

  constructor(
    private db: DbService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {}

  getError() : boolean {
    const
      passwordError = this.user.get( 'password' )?.errors,
      emailError = this.user.get( 'email' )?.errors;
    if ( passwordError ) {
        this.error = 'Invalid field password';
      return false;
    } else if ( emailError ) {
        this.error = 'Invalid field email';
      return false;
    } else {
      this.error = '';
    }

    return true;
  }

  onSubmit(): void {
    if ( this.getError() ) {
      this.db.getUser( {
        ...this.user.value
      } ).then( ( user ) => {
        if ( user ) {
          this.cookie.set( 'user', JSON.stringify( {
            ...user,
            password: ''
          } ), { expires: 3600 } );
          this.router.navigate( [ '../../account' ], {
            relativeTo: this.route
          } );
        } else {
          this.error = 'Account not found'
        }
      } ).catch( err => {
        this.error = err?.message || 'Failed to create the account'
      } )
    }
  }
}
