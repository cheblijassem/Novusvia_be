import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

const AUTH_API = 'https://novusvia.be/web/api/';
/* const AUTH_API = 'https://testinghost.yj.fr/web/api/'; */
/* const AUTH_API = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/'; */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  constructor(private http: HttpClient, private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    /* const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password); */

    const body = `username=${username}&password=${password}`;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    /* return this.http.post('https://testinghost.yj.fr/web/api/login_check', body.toString(), options) */
    return this.http.post('https://novusvia.be/web/api/login_check', body.toString(), options)
      /* return this.http.post('http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/login_check', body.toString(), options) */
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        const token = response && response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch(this.handelError);
  }



  register(user) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post(AUTH_API + 'register', user).map(res => res).catch(this.handelError);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
  getUsers(): Observable<any> {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) };
    return this.http.get(AUTH_API + 'admin/users', httpOption);
  }

  deleteUser(id: any) {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) };
    return this.http.delete(AUTH_API + 'admin/users/delete/' + id, httpOption).map(res => res);
  }
  

  enable(id: any) {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) };
    return this.http.get(AUTH_API + 'admin/users/enable/' + id, httpOption).map(res => res)
      .catch(this.handelError);
  }

  current(username: string): Observable<any> {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) };
    return this.http.get(AUTH_API + 'admin/users/current/' + username, httpOption);
  }

  update(post, username: string) {
    const httpOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) };
    return this.http.put(AUTH_API + 'admin/users/update/' + username, post, httpOption).map(res => res).catch(this.handelError);
  }

  private handelError(error: any) {
    console.log(error)
    return Observable.throw(error.error || 'server error');
  }



}
