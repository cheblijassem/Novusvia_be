import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminROUTES } from '../sidebar/sidebar.component';
import { UserROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  public focus;
  name: string;
  role: string;
  public listTitles: any[];
  public location: Location;
  constructor(private authenticationService: AuthService, location: Location, private element: ElementRef, private router: Router) {
    this.location = location;
    this.role = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('currentUser')).username;
    if (this.role === 'admin') {
      this.listTitles = AdminROUTES.filter(listTitle => listTitle);
    } else {
      this.listTitles = UserROUTES.filter(listTitle => listTitle);
    }
  }
  logout() {
    this.authenticationService.logout();
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
