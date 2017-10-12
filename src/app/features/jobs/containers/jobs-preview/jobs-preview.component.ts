import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-jobs-preview',
  templateUrl: './jobs-preview.component.html',
  styleUrls: ['./jobs-preview.component.css']
})
export class JobsPreviewComponent implements OnInit {
  collection: Observable<IJob[]>;

  constructor(
    private jobsService: JobsService,
  ) {}

  ngOnInit() {
    this.collection = this.jobsService.collection;
  }

}
