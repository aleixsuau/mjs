import { EventsService } from './../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import {trigger,
        animate,
        style,
        group,
        animateChild,
        query,
        stagger,
        transition} from '@angular/animations';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  animations: [
    trigger('EnterLeave', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)'}),
        animate('500ms ease-in')
      ])
    ]),
    trigger('selected', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(-400px)'}),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateX(40px)'})),
      ])
    ])
  ],
})
export class AgendaComponent implements OnInit {
  selectedEvent: IEvent;
  events: Observable<IEvent[]>;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
  ) { }

  ngOnInit() {
    if (this.route.data) {
      this.route
            .data
            .pluck('event')
            .subscribe((response: IEvent) => {
                          this.selectedEvent = response;
                          this.filterCollection();
                        });
    }
  }

  filterCollection() {
    this.events = this.eventsService
                          .collection$
                          .map(events => events.filter(event => this.selectedEvent ? event.id !== this.selectedEvent.id : true));
  }

}
