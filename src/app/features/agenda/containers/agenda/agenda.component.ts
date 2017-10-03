import { EventsService } from './../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  selectedEvent: Event;
  events: Observable<IEvent[]>;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
  ) { }

  ngOnInit() {
    this.route.data
          .pluck('event')
          .subscribe((response: Event) => {
            this.selectedEvent = response;
          });
    this.events = this.eventsService.collection;
  }

}
