import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { NewsComponent } from './news.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NewsComponent
  ],
  exports: [
    NewsComponent
  ]
})
export class NewsModule { }
