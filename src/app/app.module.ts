import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogBaseComponent } from './views/pages/log-base/log-base.component';
import { LogInputComponent } from './views/components/log-input/log-input.component';
import { LogButtonComponent } from './views/components/log-button/log-button.component';
import { LogSignInComponent } from './views/pages/log-sign-in/log-sign-in.component';
import { LogSignUpComponent } from './views/pages/log-sign-up/log-sign-up.component';
import { LogTitleComponent } from './views/components/log-title/log-title.component';
import { LogSubtitleComponent } from './views/components/log-subtitle/log-subtitle.component';
import { LangBaseComponent } from './views/pages/lang-base/lang-base.component';
import { LogForgotPasswordComponent } from './views/pages/log-forgot-password/log-forgot-password.component';
import { LogChangePasswordComponent } from './views/pages/log-change-password/log-change-password.component';

import { AccountBaseComponent } from './views/pages/account-base/account-base.component';
import { AccountProjectsComponent } from './views/pages/account-projects/account-projects.component';
import { AccountProfileComponent } from './views/pages/account-profile/account-profile.component';
import { AccountInfosComponent } from './views/pages/account-infos/account-infos.component';
import { AccountProjectItemComponent } from './views/components/account-project-item/account-project-item.component';
import { AccountProjectsListComponent } from './views/pages/account-projects-list/account-projects-list.component';
import { AccountProjectsCreateComponent } from './views/pages/account-projects-create/account-projects-create.component';
import { AccountProjectsFirstComponent } from './views/pages/account-projects-first/account-projects-first.component';
import { AccountProjectsSecondComponent } from './views/pages/account-projects-second/account-projects-second.component';
import { AccountProjectsThirdComponent } from './views/pages/account-projects-third/account-projects-third.component';

@NgModule({
  declarations: [
    AppComponent,
    LogBaseComponent,
    LogInputComponent,
    LogButtonComponent,
    LogSignInComponent,
    LogSignUpComponent,
    LogTitleComponent,
    LogSubtitleComponent,
    LangBaseComponent,
    LogForgotPasswordComponent,
    LogChangePasswordComponent,
    AccountBaseComponent,
    AccountProjectsComponent,
    AccountProfileComponent,
    AccountInfosComponent,
    AccountProjectItemComponent,
    AccountProjectsListComponent,
    AccountProjectsCreateComponent,
    AccountProjectsFirstComponent,
    AccountProjectsSecondComponent,
    AccountProjectsThirdComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    } )
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

export function HttpLoaderFactory( http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader( http, '/assets/18n/', '.json' );
};
