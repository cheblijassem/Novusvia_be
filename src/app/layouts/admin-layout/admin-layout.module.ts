import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { RecrutementComponent } from '../../admin/recrutement/Recrutement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastDefaults, SnotifyService, SnotifyModule } from 'ng-snotify';
import { EventComponent } from 'src/app/admin/event/event.component';
import { ProfileComponent } from 'src/app/admin/profile/profile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SuiviComponent } from 'src/app/admin/suivi/suivi.component';
import { UserComponent } from 'src/app/admin/user/user.component';
import { DemandeComponent } from 'src/app/admin/demande/demande.component';
import { EditProfileComponent } from 'src/app/admin/edit-profile/edit-profile.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    SnotifyModule,
    PdfViewerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    RecrutementComponent,
    IconsComponent,
    MapsComponent,
    EventComponent,
    ProfileComponent,
    SuiviComponent,
    UserComponent,
    DemandeComponent,
    EditProfileComponent
  ]
})

export class AdminLayoutModule { }
