import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { EventService } from 'src/app/service/event.service';
import { Recrutement } from 'src/app/recrutement/Recrutement';
import { RecrutementService } from 'src/app/service/recrutement.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {

  errorMessage: string;
  cards: any[];
  detail = <Recrutement>{};
  showDetail = false;
  currentUser: any;
  constructor(private snotifyService: SnotifyService, private _recrutementService: RecrutementService) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = user;
  }
  getRecrutements() {
    this._recrutementService.getFollowed(this.currentUser.username).subscribe(
      data => {
        this.cards = data.result;
      console.log(this.cards);
        this.cards.forEach(card => {
          card.profiles.forEach(profile => {
            if (profile.user.username === this.currentUser.username) {
              card.status = profile.status;
              card.interested = true;
            }
          });
        });
      },
      (error) => this.errorMessage = error
    );
  }

  interested(Recrutement_id) {
    this._recrutementService.interested(Recrutement_id, this.currentUser.username).subscribe(
      data => {
        this.snotifyService.success('votre demande a été prise en compte veuillez attendre une confirmation', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        this.getRecrutements();
      },
      (error) => this.errorMessage = error
    );
  }
  ignored(Recrutement_id) {
    this._recrutementService.ignored(Recrutement_id, this.currentUser.username).subscribe(
      data => {
        this.snotifyService.warning('votre demande a été supprimé', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        this.getRecrutements();
      },
      (error) => this.errorMessage = error
    );
  }

  ngOnInit() {
    this.getRecrutements();
  }

}