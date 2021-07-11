import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../service/recrutement.service';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: any[];
  errorMessage: string;
  showDetail = false;
  constructor(private _eventService: EventService) { }
  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data.result;
      },
      (error) => this.errorMessage = error
    );
  }

  ngOnInit(): void {
    this.getEvents();
  }

}
