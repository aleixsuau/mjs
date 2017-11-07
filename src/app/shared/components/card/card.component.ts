import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { useAnimation, transition, trigger, style, animate } from '@angular/animations';

import { fadeAnimation } from './../../animations/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
export class CardComponent implements OnInit {

  @Input()
  item: IEvent | INew | IJob;

  constructor() { }

  ngOnInit() {
  }

}
