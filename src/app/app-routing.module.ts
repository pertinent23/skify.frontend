import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LangBaseComponent } from './views/pages/lang-base/lang-base.component';

import { LogBaseComponent } from './views/pages/log-base/log-base.component';
import { LogSignInComponent } from './views/pages/log-sign-in/log-sign-in.component';
import { LogSignUpComponent } from './views/pages/log-sign-up/log-sign-up.component';
import { LogChangePasswordComponent } from './views/pages/log-change-password/log-change-password.component';
import { LogForgotPasswordComponent } from './views/pages/log-forgot-password/log-forgot-password.component';

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
    ] }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
