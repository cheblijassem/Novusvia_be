import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { RecrutementComponent } from '../../admin/recrutement/Recrutement.component';
import { EventComponent } from 'src/app/admin/event/event.component';
import { ProfileComponent } from 'src/app/admin/profile/profile.component';
import { AssitanceComponent } from 'src/app/admin/assitance/assitance.component';
import { SuiviComponent } from 'src/app/admin/suivi/suivi.component';
import { AcceptedComponent } from 'src/app/admin/accepted/accepted.component';
import { UserComponent } from 'src/app/admin/user/user.component';
import { DemandeComponent } from 'src/app/admin/demande/demande.component';
import { EditProfileComponent } from 'src/app/admin/edit-profile/edit-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'recrutement', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'recrutement', component: RecrutementComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'event', component: EventComponent },
    { path: 'profiles', component: ProfileComponent },
    { path: 'assistance', component: AssitanceComponent },
    { path: 'suivi', component: SuiviComponent },
    { path: 'accepted', component: AcceptedComponent },
    { path: 'users', component: UserComponent },
    { path: 'demande', component: DemandeComponent },
    { path: 'profile', component: EditProfileComponent }
];
