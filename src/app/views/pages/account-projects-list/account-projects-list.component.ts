import { Component, OnInit } from '@angular/core';
import { DbService, Project } from 'src/app/services/db.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-projects-list',
  templateUrl: './account-projects-list.component.html',
  styleUrls: ['./account-projects-list.component.scss']
})
export class AccountProjectsListComponent implements OnInit {
  list: Observable<Project[]> = new Observable( ( subscriber ) => {
    this.getList().then( data =>
      subscriber.next( data || [] )
    )
  } );

  constructor(
    private db: DbService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {

  }

  getList() : Promise<Project[]> {
    const
      data = this.cookie.get( 'user' );
    return this.db.listProject(
      JSON.parse( data )
    );
  }
}
