import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NewsService } from './../../news.service';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.css']
})
export class NewsPreviewComponent implements OnInit {

  @Input()
  collection$: Observable<INew[]>;

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.collection$ = this.newsService.collection$;
  }

}
