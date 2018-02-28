import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import {trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition,
  useAnimation} from '@angular/animations';

import { Observable } from 'rxjs/Observable';

import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from './../../components/edit-dialog/edit-dialog.component';
import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';

import { AgendaService } from './../../../../core/services/agenda/agenda.service';
import { JobsService } from './../../../../core/services/jobs/jobs.service';
import { NewsService } from './../../../../core/services/news/news.service';



import { UserService } from './../../../../core/services/user/user.service';
import { UsersService } from './../../../../core/services/users/users.service';

import { enterUpAnimation } from './../../../../shared/animations/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('enterUp', [
      transition('* => *', [
        query('mat-row', style({ opacity: 0, transform: 'translateY(20px)' }), { optional: true }),
        query('mat-row:not(:leave)',
          stagger('100ms', [
            animate('300ms ease-in')
          ]),
          { optional: true }
        ),
        // query(':leave', style({ visibility: 'hidden' }), { optional: true }),
      ])
    ]),
  ]
})
export class AdminComponent implements OnInit {
  formSection: string;
  agenda$: Observable<IEvent[]>;
  news$: Observable<INew[]>;
  jobs$: Observable<IJob[]>;
  users$: Observable<IUser[]>;
  user$: Observable<IUser>;

  dataSource: DataSourceGenerator;
  agendaSource: DataSourceGenerator;
  newsSource: DataSourceGenerator;
  jobsSource: DataSourceGenerator;
  usersSource: DataSourceGenerator;

  constructor(
    private agendaService: AgendaService,
    private newsService: NewsService,
    private jobsService: JobsService,
    private userService: UserService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.formSection = 'agenda';
    this.agenda$ = this.agendaService.collection$;
    this.news$ = this.newsService.collection$;
    this.jobs$ = this.jobsService.collection$;
    this.users$ = this.usersService.collection$;
    this.user$ = this.userService.user$;

    this.agendaSource = new DataSourceGenerator(this.agenda$);
    this.newsSource = new DataSourceGenerator(this.news$);
    this.jobsSource = new DataSourceGenerator(this.jobs$);
    this.usersSource = new DataSourceGenerator(this.users$);

    this.generateDataSource(this.formSection);

    const today = `${new Date().getFullYear()}` +
                  `-${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()}` +
                  `-${new Date().getDate()}`;
  }

  openEditDialog(item, section) {
    const data = {item, section};
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

  trackByFn(index, item) {
    return item.id;
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
