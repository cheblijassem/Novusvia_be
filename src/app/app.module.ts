import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ComponentsModule } from './components/components.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RecrutementComponent } from './recrutement/recrutement.component';
import { AuthService } from './service/auth.service';
import { RecrutementService } from './service/recrutement.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EventComponent } from './event/event.component';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AssitanceComponent } from './admin/assitance/assitance.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { SuiviComponent } from './admin/suivi/suivi.component';
import { AcceptedComponent } from './admin/accepted/accepted.component';
import { UserComponent } from './admin/user/user.component';
import { DemandeComponent } from './admin/demande/demande.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader,TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const agoraConfig: AgoraConfig = {
  AppID: '12b77605f0d14ef88f400f67224d2bff',
};
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    NavbarComponent,
    FooterComponent,
    RecrutementComponent,
    EventComponent,
    AssitanceComponent,
    AcceptedComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SnotifyModule,
    MatSelectCountryModule,
    AngularAgoraRtcModule.forRoot(agoraConfig),
    BrowserAnimationsModule,
    RecaptchaModule,  // this is the recaptcha main module
    RecaptchaFormsModule, // this is the module for form incase form validation
    SocialLoginModule,
    JwBootstrapSwitchNg2Module,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthService, RecrutementService, AuthGuard, { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    SnotifyService, {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '449236642278-l530ocq9b2p9gakf3duqct0h4saftsjp.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          }
        ],
      } as SocialAuthServiceConfig,
    }, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
