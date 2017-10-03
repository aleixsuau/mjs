import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';

import { NewsModule } from './../news/news.module';
import { WorksModule } from './../works/works.module';
import { AgendaModule } from './../agenda/agenda.module';

@NgModule({
  imports: [
    CommonModule,
    AgendaModule,
    WorksModule,
    NewsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
