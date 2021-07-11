import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
