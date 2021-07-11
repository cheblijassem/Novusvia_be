import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Recrutement } from '../recrutement/Recrutement';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  /* private adminUri = 'https://testinghost.yj.fr/web/api/admin/recrutements';
  private uri = 'https://testinghost.yj.fr/web/api/recrutements';
  private adsUri = 'https://testinghost.yj.fr/web/api/jobs';
  private adsAdminUri = 'https://testinghost.yj.fr/web/api/admin/jobs';
  private adminUriFollowed = 'https://testinghost.yj.fr/web/api/admin/followed';
  private adminUriAccpeted = 'https://testinghost.yj.fr/web/api/admin/accepted';
  private adminUriDemandes = 'https://testinghost.yj.fr/web/api/admin/demandes';
  private UriCategory = 'https://testinghost.yj.fr/web/api/category';
  private UriAdminCategory = 'https://testinghost.yj.fr/web/api/admin/category';*/

    private adminUri = 'https://novusvia.be/web/api/admin/recrutements';
    private uri = 'https://novusvia.be/web/api/recrutements';
    private adsUri = 'https://novusvia.be/web/api/jobs';
    private adsAdminUri = 'https://novusvia.be/web/api/admin/jobs';
    private adminUriFollowed = 'https://novusvia.be/web/api/admin/followed';
    private adminUriAccpeted = 'https://novusvia.be/web/api/admin/accepted';
    private adminUriDemandes = 'https://novusvia.be/web/api/admin/demandes';
    private UriCategory = 'https://novusvia.be/web/api/category';
    private UriAdminCategory = 'https://novusvia.be/web/api/admin/category';


/*   private adminUri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/recrutements';
  private uri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/recrutements';
  private adsUri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/jobs';
  private adsAdminUri = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/jobs';
  private adminUriFollowed = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/followed';
  private adminUriAccpeted = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/accepted';
  private adminUriDemandes = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/demandes';
  private UriCategory = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/category';
  private UriAdminCategory = 'http://localhost/Post-Rest-symfony-master/web/app_dev.php/api/admin/category'; */
  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  /* getRecrutements2(): Observable<any[]> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.adminUri, { headers: headers }).map(res => <Recrutement[]>res).catch(this.handelError);

  } */

  getCategory(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.UriCategory, httpOptions);
  }
  addCategory(post) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.post(this.UriAdminCategory, post, httpOptions).map(res => res).catch(this.handelError);
  }
  deleteCategory(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.UriAdminCategory + '/delete/' + id, httpOptions).map(res => res);
  }




  getRecrutements(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUri, httpOptions);
  }
  addRecrutement(post) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.post(this.uri, post).map(res => res).catch(this.handelError);
  }
  updateRecrutement(post: Recrutement, id) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.put(this.adminUri + '/' + id, JSON.stringify(post), { headers: headers }).map(res => res).catch(this.handelError);
  }
  deleteRecrutement(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.uri + '/delete/' + id, httpOptions).map(res => res);
  }
  acceptRecrutement(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUri + '/accept/' + id, httpOptions).map(res => res);
  }
  refuseRecrutement(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUri + '/refuse/' + id, httpOptions).map(res => res);
  }





  getAds(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adsUri, httpOptions);
  }

  private handelError(error) {

    return Observable.throw(error.errors || 'server error');

  }
  addAd(post) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.post(this.adsAdminUri, post, httpOptions).map(res => res).catch(this.handelError);
  }
  deleteAd(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.adsAdminUri + '/delete/' + id, httpOptions).map(res => res);
  }

  getDemandes(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUriDemandes, httpOptions);
  }
  affecterRecrutement(id: any, recrutement: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.uri + '/affecter/' + id + '/' + recrutement, httpOptions).map(res => res)
      .catch(this.handelError);
  }
  deleteDemande(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.adminUri + '/demande/' + id, httpOptions).map(res => res)
      .catch(this.handelError);
  }




  interested(profile_id: any, username: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.post(this.uri + '/interested/' + profile_id + '/' + username, httpOptions).map(res => res)
      .catch(this.handelError);
  }
  ignored(profile_id: any, username: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.delete(this.uri + '/ignored/' + profile_id + '/' + username, httpOptions).map(res => res)
      .catch(this.handelError);
  }
  accept(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.uri + '/accept/' + id, httpOptions).map(res => res)
      .catch(this.handelError);
  }
  refuse(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.uri + '/refuse/' + id, httpOptions).map(res => res)
      .catch(this.handelError);
  }
  getFollowed(username: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUriFollowed + '/' + username, httpOptions);
  }
  getAccepted(username: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token }) };
    return this.http.get(this.adminUriAccpeted + '/' + username, httpOptions);
  }
}
