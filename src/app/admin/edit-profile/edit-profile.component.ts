import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { SnotifyService } from 'ng-snotify';
import { decode } from 'punycode';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  token: any;
  errorMessage: string;
  user = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }
  form: FormGroup;
  loaderButton = false;
  errors = [];
  constructor(private _authService: AuthService, public fb: FormBuilder,
    private snotifyService: SnotifyService) {
    this.form = this.fb.group({
      username: [this.user.username],
      email: [this.user.email],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'password2')
      });
  }

  ngOnInit(): void {
    this.gestUserInfo();
  }
  gestUserInfo() {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const decoded = jwt_decode(this.token.token);
    this._authService.current(decoded.username).subscribe(
      data => {
        this.user = data.result;
        console.log(this.user);
      },
      (error) => this.errorMessage = error
    );
  }
  changepassword() {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const decoded = jwt_decode(this.token.token);
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append('username', this.form.get('username').value);
    formData.append('email', this.form.get('email').value);
    formData.append('password', this.form.get('password').value);
    formData.append('password2', this.form.get('password').value);

    this._authService.update(formData, decoded.username).subscribe((result => {
      this.gestUserInfo();
      this.form.reset();
      this.snotifyService.success('mot de pass changé', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.loaderButton = false;
    }), addError => {
      this.errors = addError; console.log(this.errors); this.loaderButton = false; this.form.reset(); this.snotifyService.warning('demande erronée', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
