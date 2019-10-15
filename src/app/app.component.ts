import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { CustomHttpService } from './core/services/custom-http/custom-http.service';
// Firebase
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$: Observable<Boolean>;

  constructor(
    private db: AngularFireDatabase,
    private customHttpService: CustomHttpService,
  ) {}

  ngOnInit() {
    this.loading$ = this.customHttpService.loading$;
  }
}
