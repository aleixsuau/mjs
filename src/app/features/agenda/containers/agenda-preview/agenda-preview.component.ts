import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventsService } from '../../services/events.service';
import { CustomHttpService } from '../../../../core/services/custom-http/custom-http.service';

@Component({
  selector: 'app-agenda-preview',
  templateUrl: './agenda-preview.component.html',
  styleUrls: ['./agenda-preview.component.css']
})
export class AgendaPreviewComponent implements OnInit {
  collection$: Observable<IEvent[]>;
  loader: Observable<string>;

  constructor(
    private eventsService: EventsService,
    private customHttpService: CustomHttpService,
  ) { }

  ngOnInit() {
    this.collection$ = this.eventsService.collection$;
  }

  create() {
    this.customHttpService
          .get('api/agenda/')
          .subscribe((response) => console.log(response));
    this.eventsService
          .create({
            id: '10',
            title: `Event 10`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            date: `10/08`,
            time: `18:00`,
            image: {
              title: 'imageeee.jpeg',
              url: `https://files.genial.guru/files/news/part_2/22205/49955-13-1000-15c7813afc-1484583985.jpg`,
              size: 5,
            }
          });
  }

}
