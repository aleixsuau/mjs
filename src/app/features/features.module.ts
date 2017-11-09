import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from '../features/home/home.module';
import { AgendaModule } from '../features/agenda/agenda.module';
import { NewsModule } from '../features/news/news.module';
import { JobsModule } from '../features/jobs/jobs.module';
import { AdminModule } from '../features/admin/admin.module';

@NgModule({
  imports: [
    HomeModule,
    AgendaModule,
    NewsModule,
    JobsModule,
    AdminModule
  ],
  declarations: []
})
export class FeaturesModule { }
