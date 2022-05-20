import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { IsProjectGuard } from './guards/is-project.guard';

import { LangBaseComponent } from './views/pages/lang-base/lang-base.component';

import { LogBaseComponent } from './views/pages/log-base/log-base.component';
import { LogSignInComponent } from './views/pages/log-sign-in/log-sign-in.component';
import { LogSignUpComponent } from './views/pages/log-sign-up/log-sign-up.component';
import { LogChangePasswordComponent } from './views/pages/log-change-password/log-change-password.component';
import { LogForgotPasswordComponent } from './views/pages/log-forgot-password/log-forgot-password.component';

import { AccountBaseComponent } from './views/pages/account-base/account-base.component';
import { AccountProfileComponent } from './views/pages/account-profile/account-profile.component';
import { AccountInfosComponent } from './views/pages/account-infos/account-infos.component';

import { AccountProjectsComponent } from './views/pages/account-projects/account-projects.component';
import { AccountProjectsListComponent } from './views/pages/account-projects-list/account-projects-list.component';
import { AccountProjectsCreateComponent } from './views/pages/account-projects-create/account-projects-create.component';
import { AccountProjectsFirstComponent } from './views/pages/account-projects-first/account-projects-first.component';
import { AccountProjectsSecondComponent } from './views/pages/account-projects-second/account-projects-second.component';
import { AccountProjectsThirdComponent } from './views/pages/account-projects-third/account-projects-third.component';

const routes: Routes = [
  { path: '', redirectTo: '/fr/log/sign-in', pathMatch: 'full', data: { animation: 'base' } },
  { path: ':lang', component: LangBaseComponent, data: { animation: 'lang' }, children: [
    { path: '', redirectTo: 'log', pathMatch: 'full', data: { animation: 'lang-home' } },
    { path: 'log', component: LogBaseComponent, data: { animation: 'log' }, children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full', data: { animation: 'log-home' }  },
      { path: 'sign-in', component: LogSignInComponent, data: { animation: 'log-sign-in' } },
      { path: 'sign-up', component: LogSignUpComponent, data: { animation: 'log-sin-up' } },
      { path: 'forgot-password', component: LogForgotPasswordComponent, data: { animation: 'log-forgot-password' } },
      { path: 'change-password', component: LogChangePasswordComponent, data: { animation: 'log-change-password' } },
    ] },
    { path: 'account',
      component: AccountBaseComponent,
      data: { animation: 'account' },
      canActivate: [ AuthGuard ],
      children: [
        { path: '', redirectTo: 'projects', pathMatch: 'full' },
        { path: 'profile', component: AccountProfileComponent, data: { animation: 'account-profile' } },
        { path: 'projects', component: AccountProjectsComponent, data: { animation: 'account-projects' }, children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AccountProjectsListComponent, data: { animation: 'account-projects-list' } },
          { path: 'create', component: AccountProjectsCreateComponent, data: { animation: 'account-projects-create' } },
          {
            path: 'first/:id',
            component: AccountProjectsFirstComponent,
            data: { animation: 'account-projects-first' },
            canActivate: [ IsProjectGuard ]
          },
          {
            path: 'second/:id',
            component: AccountProjectsSecondComponent,
            data: { animation: 'account-projects-second' },
            canActivate: [ IsProjectGuard ]
          },
          {
            path: 'third/:id',
            component: AccountProjectsThirdComponent,
            data: { animation: 'account-projects-third' },
            canActivate: [ IsProjectGuard ]
          },
        ] },
        { path: 'infos', component: AccountInfosComponent, data: { animation: 'account-infos' } }
      ]
    }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    IsProjectGuard
  ]
})
export class AppRoutingModule { }
