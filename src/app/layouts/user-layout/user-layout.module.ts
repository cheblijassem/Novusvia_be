import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { UserLayoutRoutes } from './user-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from 'src/app/signup/signup.component';
import { LandingComponent } from 'src/app/landing/landing.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { MetierComponent } from 'src/app/metier/metier.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ToastDefaults, SnotifyService, SnotifyModule } from 'ng-snotify';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { WeatherComponent } from 'src/app/shared/weather/weather.component';
import { WeatherComponent as WeatherComponent2 } from 'src/app/weather/weather.component';
import { FormationComponent } from 'src/app/formation/formation.component';
// import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const agoraConfig: AgoraConfig = {
  AppID: '12b77605f0d14ef88f400f67224d2bff',
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    SnotifyModule,
    MatSelectCountryModule,
    AngularAgoraRtcModule.forRoot(agoraConfig),
    RecaptchaModule,  //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    LoginComponent,
    ContactComponent,
    MetierComponent,
    HomeComponent,
    WeatherComponent,
    WeatherComponent2,
    FormationComponent
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})

export class UserLayoutModule { }
