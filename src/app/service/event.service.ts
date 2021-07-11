import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventUri = 'https://novusvia.be/web/api/posts';
  private newsletterUri = 'https://novusvia.be/web/api/newsletter';

  /* private eventUri = 'https://testinghost.yj.fr/web/api/posts';
  private newsletterUri = 'https://testinghost.yj.fr/web/api/newsletter'; */

  /* private eventUri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/posts';
  private newsletterUri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/newsletter'; */
  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  newsletter(post) {
    return this.http.post(this.newsletterUri, post, { responseType: 'text' });
  }
  getEvents(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.eventUri, httpOptions);
  }
  addEvent(post) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.post(this.eventUri, post, httpOptions).map(res => res).catch(this.handelError);
  }
  deleteEvent(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.eventUri + '/' + id, httpOptions).map(res => res);
  }

  /* 
    'O71ThnNJquI'
    'yY4uYudDb0d-jKqOld-q4tBc9CPoxFKBmSQ_Vd0Xb6ZFfBG2dGdlTw'
    '1Sd_Qzzbk-m0uQM44kttIiHnWRr50C1z6Y_k2mjJ' 
    35.205.195.146 brux
  
    41.226.27.119 tunis
  
  
    */

  getLstEvents(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + '1Sd_Qzzbk-m0uQM44kttIiHnWRr50C1z6Y_k2mjJ', 'Accept': 'application/json' }) };
    return this.http.get('https://api.predicthq.com/v1/events/?category=academic&limit=2', httpOptions);
  }
  getLstEvents2(): Observable<any> {
    return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=iO406PqQHP4h3uAHxw2HAXANH1byG9oK');
  }
  private handelError(error) {

    return Observable.throw(error.errors || 'server error');

  }

  getClientPosition(ip): Observable<any> {
    return this.http.get('https://ipapi.co/' + ip + '/json/');
  }
  getClientPositionb(): Observable<any> {
    return this.http.get('https://ipapi.co/35.205.195.146/json/');
  }

  getWeatherData(latitude, longitude): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Access-Control-Allow-Headers': 'x-requested-with ' }) };
    return this.http.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?APPID=9b4bbf30228eb8528d36e79d05da1fac&lat=' + latitude + '&lon=' + longitude + '&units=metric&cnt=5');
  }
}

