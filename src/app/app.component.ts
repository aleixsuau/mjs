import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { CustomHttpService } from './core/services/custom-http/custom-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading: Observable<Boolean>;

  constructor(
    private customHttpService: CustomHttpService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.loading = this.customHttpService.loading;

    // TODO: Remove this data generator.
    /* const sections = ['events', 'news', 'jobs'];

    sections.forEach(section => {
      for (let i = 0; i < 10; i++) {
        const id = this.db.list(section).push(null).key;
        const item = {
          id,
          title: `${section} ${i}`,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: Date.now(),
          time: '18:30',
          image: 'noimage.jpg',
        };
        console.log(`${section}/${id}`, item);
        this.db.list(`${section}`).set(id, item);
      }
    }); */
  }
}
