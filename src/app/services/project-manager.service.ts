import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Project } from './db.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor(
    private db: DbService
  ) {}

  getData( id: number ) : Promise<Project> {
    return new Promise((resolve, reject)=> {
      this.db.getProject( id ).then( data => {
        resolve( data );
      } ).catch( reject );
    });
  }

  private update( data : Project ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.updateProject( data )
      .then( resolve )
      .catch( reject )
    } );
  }

  save( id: number, key: string, form: Record<string, any> ) : Promise<void> {
    return new Promise( async (resolve, reject) => {
      const
        data = ( await this.getData( id ) ).data,
        prev = data[ key ] || {};
        data[ key ] = {
          ...prev,
          ...form
        };
      return this.update( {
        projectID: id,
        data,
        title: '',
        description: '',
        userID: 0
      } );
    } )
  }
}
