import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface User {
  userID?: number;
  name?: string;
  email: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Project {
  projectID?: number;
  title: string;
  description: string;
  data: Record<string, any>;
  userID: number;
  createdAt?: number;
  updatedAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  isOpenDB = false;
  isErrorDB = false;
  private projects = 'projects';
  private users = 'users';
  constructor() {
    super( 'skify' );

    this.version( 1 ).stores( {
      users: '++userID, name, email, password, createdAt, updatedAt',
      projects: '++projectID, userID, title, description, data, createdAt, updatedAt'
    } );

    this.open().then( () => (
      this.isOpenDB = true
    ) ).catch( () => (
      this.isOpenDB = true
    ) );
  }

  addUser( { name, password, email }: User ) : Promise<void> {
    return new Promise( ( resolve, reject ) => (
      this.table( this.users ).add( {
        name,
        password,
        email,
        createdAt: Date.now(),
        updatedAt: Date.now()
      } )
      .then( () => resolve() )
      .catch( err => reject( err ) )
    ) );
  }

  getUser( { email, password }: { email: string, password: string } ) : Promise<User> {
    return new Promise( ( resolve, reject ) => {
      this.table( this.users )
        .where( { email, password } )
        .toArray()
        .then( data => resolve( data[ 0 ] ) )
        .catch( err => reject( err ) )
    } );
  }

  addProject( { title, description, data, userID }: Project ) : Promise<void> {
    return new Promise( ( resolve, reject ) => (
      this.table( this.projects ).add( {
        title,
        description,
        userID,
        data,
        createdAt: Date.now(),
        updatedAt: Date.now()
      } )
      .then( () => resolve() )
      .catch( err => reject( err ) )
    ) );
  }

  listProject( user: User ) : Promise<Project[] > {
    return new Promise( ( resolve, reject ) => {
      if ( !user.userID )
        return reject( {} );
      this
        .table( this.projects )
        .where( 'userID' )
        .equals( user.userID )
        .toArray()
        .then( data => resolve( data ) )
        .catch( err => reject( err ) )
    } );
  }

  updateProject( project: Project ) : Promise<void> {
    return new Promise( ( resolve, reject ) => {
      this.table( this.projects ).update( project.projectID, {
        data: project.data,
        updatedAt: Date.now()
      } )
      .then( () => resolve() )
      .catch( err => reject( err ) )
    } );
  }

  getProject( id: number ) : Promise<Project> {
    return new Promise( ( resolve, reject ) => {
      this.table( this.projects ).get( id )
      .then( data => resolve( data ) )
      .catch( err => reject( err ) )
    } );
  }
}
