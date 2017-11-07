import { ScrollToService } from './../../../../core/services/scroll-to/scroll-to.service';
import { EventsService } from './../../services/events.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition,
  useAnimation} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import { fadeAnimation } from './../../../../shared/animations/animations';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  animations: [
    trigger('EnterUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)'}),
        animate('500ms 600ms ease-in')
      ])
    ]),
    trigger('selected', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('1300ms ease-in'),
      ])
    ]),
    trigger('fade', [
      transition('* <=> *', [
        useAnimation(fadeAnimation, {
          delay: 0,
          params: { from: 0, to: 1, time: '1s' },
        })
      ])
    ])
  ],
})
export class AgendaComponent implements OnInit, AfterContentInit {
  selectedEvent: IEvent;
  events: Observable<IEvent[]>;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private scrollToService: ScrollToService
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

  ngAfterContentInit() {
    // window.scrollTo(0, 0);
  }

  scrollUp() {
    this.scrollToService.scrollTo(800, 0);
  }

  filterCollection() {
    this.events = this.eventsService
                          .collection$;
  }

}
