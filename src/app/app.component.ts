import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { CustomHttpService } from './core/services/custom-http/custom-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: Observable<boolean>;

  constructor(
    private customHttpService: CustomHttpService,
  ) {}

  ngOnInit() {
    this.loading = this.customHttpService.loading;
  }
}
