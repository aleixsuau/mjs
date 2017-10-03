import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { NewsService } from './news.service';

import { NewsPreviewComponent } from './containers/news-preview/news-preview.component';
import { NewComponent } from './components/new/new.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NewsPreviewComponent,
    NewComponent
  ],
  providers: [
    NewsService
  ],
  exports: [
    NewsPreviewComponent
  ]
})
export class NewsModule { }
