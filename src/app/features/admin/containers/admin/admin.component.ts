import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { MdDialog } from '@angular/material';

import { EditDialogComponent } from './../../components/edit-dialog/edit-dialog.component';
import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';

import { NewsService } from './../../../news/news.service';
import { WorksService } from './../../../works/works.service';
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
  works: Observable<IWork[]>;
  eventsTableColumns = [{ name: 'id', label: 'ID' }, { name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  newsTableColumns = [{ name: 'id', label: 'ID' }, { name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  worksTableColumns = [{ name: 'id', label: 'ID' }, { name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];

  adminForm: FormGroup;
  get speakers(): FormArray {
    return this.adminForm.get('speakers') as FormArray;
  }

  constructor(
    private eventsService: EventsService,
    private newsService: NewsService,
    private worksService: WorksService,
    private formBuilder: FormBuilder,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    this.events = this.eventsService.collection;
    this.news = this.newsService.collection;
    this.works = this.worksService.collection;


    const today = `${new Date().getFullYear()}` +
                  `-${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()}` +
                  `-${new Date().getDate()}`;

    this.adminForm = this.formBuilder
                            .group({
                                title: ['', Validators.required, Validators.minLength(5)],
                                description: ['', Validators.required, Validators.minLength(40)],
                                date: [today, Validators.required],
                                time: [`${new Date().getHours()}:${new Date().getMinutes()}`, Validators.required],
                                speakers: this.formBuilder.array([
                                  this.formBuilder.group({
                                    name: ['', Validators.required],
                                    contact: ['', Validators.required]
                                  })
                                ])
                            });
  }

  onSubmit() {
    console.log('Form value: ', this.adminForm.value);
  }

  logStatus() {
    console.log(this.adminForm, this.adminForm.value, this.adminForm.status);
  }

  addSpeaker() {
    this.speakers.push(this.formBuilder.group({ name: '', contact: ''}));
  }

  removeSpeaker(index) {
    this.speakers.removeAt(index);
  }

  openEditDialog(item, section) {
    console.log('item, text: ', item, section);
    const EditDialogRef = this.dialog.open(EditDialogComponent, {data: item});
    EditDialogRef
        .afterClosed()
        .subscribe(editedItem => {
          const service = `${section}Service`;

          if (item && editedItem) {
            const itemToSave = {...item, ...editedItem};
            this[service].update(itemToSave);
            console.log('Dialog: ', itemToSave);
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
