import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { MdDialog } from '@angular/material';

import { EditDialogComponent } from './../../components/edit-dialog/edit-dialog.component';
import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';

import { NewsService } from './../../../news/news.service';
import { JobsService } from './../../../jobs/jobs.service';
import { EventsService } from './../../../agenda/services/events.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  formSection = 'events';
  events: Observable<IEvent[]>;
  news: Observable<INew[]>;
  jobs: Observable<IJob[]>;
  eventsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  newsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  jobsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];

  constructor(
    private eventsService: EventsService,
    private newsService: NewsService,
    private jobsService: JobsService,
    private formBuilder: FormBuilder,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    this.events = this.eventsService.collection;
    this.news = this.newsService.collection;
    this.jobs = this.jobsService.collection;


    const today = `${new Date().getFullYear()}` +
                  `-${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()}` +
                  `-${new Date().getDate()}`;
  }

  openEditDialog(item, section) {
    const data = {
      item,
      section
    };
    const EditDialogRef = this.dialog.open(EditDialogComponent, { data });
    EditDialogRef
        .afterClosed()
        .subscribe(editedItem => {
          const service = `${section}Service`;
          console.log('editedItem: ', editedItem);

          if (item && editedItem) {
            const itemToSave = {...item, ...editedItem};
            this[service].update(itemToSave);
          } else if (editedItem) {
            const itemToSave = {...editedItem};
            this[service].create(itemToSave);
          }

        });
  }

  openNotifyDialog(item, section) {
    const NotifyDialogRef = this.dialog.open(DialogComponent, { data: { message: 'Are you sure you want to motherfucker DELETE this?'} });
    NotifyDialogRef
      .afterClosed()
      .subscribe(ok => {
        const service = `${section}Service`;
        if (ok) {
          this[service].delete(item);
        }
      });
  }

}
