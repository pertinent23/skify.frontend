import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-projects-create',
  templateUrl: './account-projects-create.component.html',
  styleUrls: ['./account-projects-create.component.scss']
})
export class AccountProjectsCreateComponent implements OnInit {
  error = '';
  project = new FormGroup( {
    title: new FormControl( '', [
      Validators.required,
      Validators.minLength( 3 )
    ] ),
    description: new FormControl( '', [
      Validators.required,
      Validators.minLength( 5 )
    ] )
  } );
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {}

  onSubmit() : void {
    if ( !this.project.valid ) {
      this.error = 'missing form field';
    } else {
      const
        user = JSON.parse(
          this.cookie.get( 'user' )
        );
        this.error = '';
      this.db.addProject( {
        ...this.project.value,
        userID: user.userID,
        data: {}
      } ).then( () => {
        this.router.navigate( [ '../list' ], {
          relativeTo: this.route
        } );
      } ).catch( err => {
        this.error = err.message || 'Failed to save the new project'
      } );
    }
  }
}
