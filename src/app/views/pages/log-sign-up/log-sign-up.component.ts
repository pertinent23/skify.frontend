import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component( {
  selector: 'app-log-sign-up',
  templateUrl: './log-sign-up.component.html',
  styleUrls: ['./log-sign-up.component.scss']
} )
export class LogSignUpComponent implements OnInit {
  error = '';
  user = new FormGroup( {
    email: new FormControl( '', [
      Validators.required,
      Validators.email
    ] ),
    password: new FormControl( '', [
      Validators.required,
      Validators.minLength( 5 )
    ] ),
    name: new FormControl( '', [
      Validators.required,
      Validators.minLength( 3 ),
      Validators.pattern( /^[a-z\s]{1,}(\-[a-z\s]{1,}){0,}[a-z\s]{1,}$/i )
    ] ),
  } );

  constructor(
    private db: DbService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  getError() : boolean {
    const
      nameError = this.user.get( 'name' )?.errors,
      passwordError = this.user.get( 'password' )?.errors,
      emailError = this.user.get( 'email' )?.errors;
    if ( nameError ) {
        this.error = 'Invalid field name';
      return false;
    } else if ( passwordError ) {
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
      this.db.addUser( {
        ...this.user.value
      } ).then( () => {
        return this.router.navigate( [ '../sign-in' ], {
          relativeTo: this.route
        } );
      } ).catch( err => {
        this.error = err?.message || 'Failed to create the account'
      } )
    }
  }
}
