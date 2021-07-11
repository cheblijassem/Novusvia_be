import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private storageSub = new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('changed');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next('changed');
  }
}
