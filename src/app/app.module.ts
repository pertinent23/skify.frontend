import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    LogChangePasswordComponent
  ],
  imports: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory( http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader( http, '/assets/18n/', '.json' );
};
