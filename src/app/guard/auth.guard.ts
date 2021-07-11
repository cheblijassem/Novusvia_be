import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      const date = this.getTokenExpirationDate(localStorage.getItem('currentUser'));
      if (date === undefined) {
        this.router.navigate(['/login']);
        this.authService.logout();
        return false;
      } else if (date.valueOf() < new Date().valueOf()) {
        this.router.navigate(['/login']);
        this.authService.logout();
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    this.authService.logout();
    return false;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) { return null; }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

}
