import { Component, OnInit } from '@angular/core';
import { useAnimation, transition, trigger, style, animate } from '@angular/animations';
import { fadeAnimation } from './../../../../shared/animations/animations';
import { Observable } from 'rxjs/Observable';

import { NewsService } from './../../../news/news.service';
import { JobsService } from './../../../jobs/jobs.service';
import { EventsService } from './../../../agenda/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('* <=> *', [
        useAnimation(fadeAnimation, {
          delay: 0,
          params: { from: 0, to: 1, time: '1s' },
        })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  events: IEvent[];
  eventsIndex = 0;
  selectedEvent: IEvent;
  selectedNew: IEvent;
  selectedJob: IJob;


  constructor(
    private eventsService: EventsService,
    private newsService: NewsService,
    private jobsService: JobsService,
  ) { }

  ngOnInit() {
    this.eventsService
            .collection$
            .subscribe((events) => {
              this.events = events;
              this.selectedEvent = this.events[this.eventsIndex];
            });
    this.newsService
            .collection$
            .subscribe((news) => {
              this.selectedNew = news[0];
            });
    this.jobsService
            .collection$
            .subscribe((jobs) => {
              this.selectedJob = jobs[0];
            });
  }

  nextEvent() {
    this.eventsIndex < this.events.length - 1 ? this.eventsIndex++ : this.eventsIndex = 0;
    this.selectedEvent = this.events[this.eventsIndex];
  }

  prevEvent() {
    this.eventsIndex > 0 ?  this.eventsIndex-- : this.eventsIndex = this.events.length - 1;
    this.selectedEvent = this.events[this.eventsIndex];
  }

}
