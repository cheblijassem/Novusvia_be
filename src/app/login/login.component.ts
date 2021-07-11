import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  name: any;
  username: string;
  password: string;
  error: string;

  user: SocialUser;
  loggedIn: boolean;

  constructor(private router: Router,
    private authenticationService: AuthService,
    private socialAuthService: SocialAuthService) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  login(e) {

    e.preventDefault();
    this.authenticationService.login(this.username, this.password)
      .subscribe(result => {
        if (this.username === 'admin') {
          this.router.navigate(['admin/recrutement']);
        } else {
          this.router.navigate(['admin/profile']);
        }

      }, loginError => this.error = loginError.message + ' : verify  your username or password !  ');


  }
}
