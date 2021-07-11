import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})


export class EventComponent implements OnInit {

  errors = [];
  form2: FormGroup;
  show2 = false;
  loaderButton = false;
  events: any[];
  errorMessage: string;
  showDetail = false;
  constructor(public fb: FormBuilder, private _eventService: EventService, private snotifyService: SnotifyService) {
    this.form2 = this.fb.group({
      title: ['', Validators.required]
    })
  }

  addEvent() {
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append("title", this.form2.get('title').value);

    this._eventService.addEvent(formData).subscribe((result => {
      this.getEvents();
      this.show2 = false;
      this.form2.reset();
      this.snotifyService.success('Event ajouté', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.loaderButton = false;
      console.log(result);
    }), addError => { this.errors = addError; console.log(this.errors); });
  }
  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data.result;
      },
      (error) => this.errorMessage = error
    );
  }
  deleteEvent(id) {
    this._eventService.deleteEvent(id).subscribe(
      result => {
        this.getEvents();
        this.snotifyService.success('Evénement supprimé', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    );
  }
  ngOnInit() {
    this.getEvents();
  }

}
