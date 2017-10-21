import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';

import { NewsModule } from './../news/news.module';
import { JobsModule } from './../jobs/jobs.module';
import { AgendaModule } from './../agenda/agenda.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgendaModule,
    JobsModule,
    NewsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
