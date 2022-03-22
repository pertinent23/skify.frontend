import { trigger, transition, style, animate, group, query } from '@angular/animations';
import { RouterOutlet} from '@angular/router';

export const fadeAnimation = trigger( 'fadeAnimation', [
  transition( '* <=> *', [
    query( ':enter, :leave', style( {
      position: 'fixed',
      width: '100%'
    } ), { optional: true } ),
    group( [
      query( ':enter', [
        style( {
          opacity: 0
        } ),
        animate( '0.5s ease-in-out', style( {
          opacity: 1
        } ) )
      ], { optional: true } ),
      query( ':leave', [
        style( {
          opacity: 1
        } ),
        animate( '0.5s ease-in-out', style( {
          opacity: 0
        } ) )
      ], { optional: true } ),
    ] )
  ] )
] );

export const slideInAnimation = trigger( 'slideInAnimation', [
  transition( '* <=> *', [
    query( ':enter, :leave', style( {
      position: 'fixed',
      width: '100%'
    } ), { optional: true } ),
    group( [
      query( ':enter', [
        style( {
          transform: 'translateX(100%)',
          opacity: 0.5
        } ),
        animate( '0.8s ease-in-out', style( {
          transform: 'translateX(0%)',
          opacity: 1
        } ) )
      ], { optional: true } ),
      query( ':leave', [
        style( {
          transform: 'translateX(0%)',
          opacity: 1
        } ),
        animate( '0.8s ease-in-out', style( {
          transform: 'translateX(-100%)',
          opacity: 0.5
        } ) )
      ], { optional: true } ),
    ] )
  ] )
] );

export const slideUpAnimation = trigger( 'slideUpAnimation', [
  transition( ':leave', [
    style( {
      transform: 'translateY( 0 )'
    } ),
    animate( '0.1s', style( {
      transform: 'translateY( 150px )'
    } ) )
  ] ),
  transition( '* => *', [
    style( {
      transform: 'translateY( 150px )'
    } ),
    animate( '0.1s', style( {
      transform: 'translateY( 0 )'
    } ) )
  ] )
] );

export class Animations {
  public getAnimationData( outlet?: RouterOutlet ) : string {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData[ 'animation' ];
  }
}
