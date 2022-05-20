import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/services/db.service';

@Component({
  selector: 'app-account-projects-first',
  templateUrl: './account-projects-first.component.html',
  styleUrls: ['./account-projects-first.component.scss']
})
export class AccountProjectsFirstComponent implements OnInit {
  id?: string | null;
  all: Record<string, any> = {};
  link: string  = '../../second';
  key: string  = 'first';
  current: FormGroup = new FormGroup( {
    px1: new FormControl( 0, [ ] ),
    px2: new FormControl( 0, [ ] ),
    sx1: new FormControl( 0, [ ] ),
    sx2: new FormControl( 0, [ ] ),
    g1: new FormControl( 0, [ ] ),
    g2: new FormControl( 0, [ ] ),
    l1: new FormControl( 0, [ ] ),
    l2: new FormControl( 0, [ ] ),
    l3: new FormControl( 0, [ ] )
  } );
  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected project: ProjectManagerService
  ) { }

  async fillInputs( data: Record<string, any> ) {
    this.current.setValue( data );
  }

  ngOnInit() : Promise<Project> {
    return new Promise( async ( resolve ) => {
      this.id = await new Promise( ( resolve ) => {
        this.route.paramMap.subscribe( params => resolve( params.get( 'id' ) ) )
      } );

      if ( this.id ) {
        this.project.getData( parseInt( this.id ) ).then( ( pro ) => {
          this.all = pro.data;
            this.fillInputs( pro.data[ this.key ] || {} )
          resolve( pro );
        } )
      }
    } );
  }

  async next() {
    this.router.navigate( [ `${ this.link }/${ this.id }` ], {
      relativeTo: this.route
    } );
  }

  getValue() : Record<string, any> {
    return this.current.value;
  }

  async save() {
    this.project.save(
      parseInt( this.id || '0' ),
      this.key,
      this.getValue()
    );
  }

  getAT() : number {
    const
      _ = {
        ...this.all[ 'first' ],
        ...this.current.value
      },
      pl = Math.min(
        _.px1 - ( _.sx1 + _.g1 - _.l1 * _.l3 ),
        _.px2 - ( _.sx1 + _.g2 - _.l2 * _.l3 )
      ) - 10;
    return isNaN( pl ) ? 0 : pl;
  }

  getR() : number {
    const
      pl = this.getAT();
    return Math.ceil( Math.pow( 10, (
      ( -40.4 + pl ) / 20
    ) ) / 10 );
  }
}
