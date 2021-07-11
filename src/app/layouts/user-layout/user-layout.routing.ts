import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { MetierComponent } from 'src/app/metier/metier.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RecrutementComponent } from 'src/app/recrutement/recrutement.component';
import { EventComponent } from 'src/app/event/event.component';
import { WeatherComponent } from 'src/app/shared/weather/weather.component';
import { FormationComponent } from 'src/app/formation/formation.component';



export const UserLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'metier', component: MetierComponent },
  { path: 'rh', component: RecrutementComponent },
  { path: 'event', component: EventComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'formation', component: FormationComponent },
];
