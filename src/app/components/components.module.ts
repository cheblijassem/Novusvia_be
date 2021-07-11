import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarAdminComponent } from './navbar/navbar.component';
import { FooterAdminComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterAdminComponent,
    NavbarAdminComponent,
    SidebarComponent
  ],
  exports: [
    FooterAdminComponent,
    NavbarAdminComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
