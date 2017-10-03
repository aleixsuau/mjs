import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { WorksService } from '../../works.service';

@Component({
  selector: 'app-works-preview',
  templateUrl: './works-preview.component.html',
  styleUrls: ['./works-preview.component.css']
})
export class WorksPreviewComponent implements OnInit {
  collection: Observable<IWork[]>;

  constructor(
    private worksService: WorksService,
  ) {}

  ngOnInit() {
    this.collection = this.worksService.collection;
  }

}
