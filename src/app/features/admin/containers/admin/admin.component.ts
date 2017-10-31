import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from './../../components/edit-dialog/edit-dialog.component';
import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';

import { EventsService } from './../../../agenda/services/events.service';
import { NewsService } from './../../../news/news.service';
import { JobsService } from './../../../jobs/jobs.service';
import { UserService } from './../../../../core/services/user/user.service';
import { UsersService } from './../../../../core/services/users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  formSection = 'events';
  events$: Observable<IEvent[]>;
  news$: Observable<INew[]>;
  jobs$: Observable<IJob[]>;
  users$: Observable<IUser[]>;
  user$: Observable<IUser>;
  eventsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  newsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];
  jobsTableColumns = [{ name: 'title', label: 'TITLE' }, { name: 'description', label: 'DESCRIPTION' }, { name: 'date', label: 'DATE' }, { name: 'time', label: 'TIME' }, { name: 'image', label: 'IMAGE' }];

  displayedColumns = ['title', 'description', 'date', 'time', 'image', 'edit', 'delete'];
  displayedUserColumns = ['image', 'name', 'role', 'delete' ];
  dataSource: DataSourceGenerator;
  eventsSource: DataSourceGenerator;
  newsSource: DataSourceGenerator;
  jobsSource: DataSourceGenerator;
  usersSource: DataSourceGenerator;

  constructor(
    private eventsService: EventsService,
    private newsService: NewsService,
    private jobsService: JobsService,
    private userService: UserService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.events$ = this.eventsService.collection$;
    this.news$ = this.newsService.collection$;
    this.jobs$ = this.jobsService.collection$;
    this.users$ = this.usersService.collection$;
    this.user$ = this.userService.user$;

    this.eventsSource = new DataSourceGenerator(this.events$);
    this.newsSource = new DataSourceGenerator(this.news$);
    this.jobsSource = new DataSourceGenerator(this.jobs$);
    this.usersSource = new DataSourceGenerator(this.users$);

    this.generateDataSource(this.formSection);

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
    const NotifyDialogRef = this.dialog.open(DialogComponent, { data: { message: 'Are you sure you want to DELETE this?'} });
    NotifyDialogRef
      .afterClosed()
      .subscribe(ok => {
        const service = `${section}Service`;
        if (ok) {
          this[service].delete(item);
        }
      });
  }

  onRoleChange(user) {
    this.usersService.update(user);
  }

  generateDataSource(target) {
    this.dataSource = new DataSourceGenerator(this[`${target}$`]);
  }
}

export class DataSourceGenerator extends DataSource<any> {

  constructor(private data) {
    super();
  }

  connect(): Observable<Element[]> {
    return this.data;
  }

  disconnect() {}
}
