import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    error: string;
    form: FormGroup;
    email: string;
    username: string;
    password: string;
    user: SocialUser;
    loaderButton = false;
    errors = [];
    constructor(private router: Router,
        private authenticationService: AuthService,
        private socialAuthService: SocialAuthService,
        public fb: FormBuilder,
        private snotifyService: SnotifyService) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],

        });
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    ngOnInit() { }
    register(e) {
        e.preventDefault();
        this.loaderButton = true;
        const formData: any = new FormData();
        formData.append('email', this.form.get('email').value);
        formData.append('username', this.form.get('username').value);
        formData.append('password', this.form.get('password').value);

        this.authenticationService.register(formData).subscribe((result => {
            this.form.reset();
            this.snotifyService.success('votre demande à été bien envoyé, nous vous contactons dans le plus bref délais', 'Merci', {
                timeout: 0,
                showProgressBar: false,
                closeOnClick: false,
                position: SnotifyPosition.centerCenter,
                buttons: [
                    {
                        text: 'Fermer', action: (toast) => {
                            this.snotifyService.remove(toast.id);
                        }, bold: true
                    },
                ]
            });
            this.loaderButton = false;
        }), registerError => {
            this.error = registerError.message + ' : verify  your username or password !  ';
            this.loaderButton = false;
        });
    }
}
