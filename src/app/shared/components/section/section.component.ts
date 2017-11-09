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
import { ScrollToService } from './../../../core/services/scroll-to/scroll-to.service';
import { fadeAnimation } from './../../animations/animations';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
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
export class SectionComponent implements OnInit {
  section: string;
  highlight: IEvent | IJob | INew;
  collection: IEvent[] | IJob[] | INew[];

  constructor(
    private route: ActivatedRoute,
    private scrollToService: ScrollToService,
  ) {}

  ngOnInit() {
    if (this.route.data) {
      this.route
            .data
            .subscribe((response: any) => {
                        this.section = response.data.section;
                        this.highlight = response.data.highlight;
                        this.collection = response.data.collection;
                      });
    }
  }

  scrollUp() {
    this.scrollToService.scrollTo(800, 0);
  }

}
