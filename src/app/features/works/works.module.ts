import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { WorksService } from './works.service';

import { WorksPreviewComponent } from './containers/works-preview/works-preview.component';
import { WorkComponent } from './components/work/work.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WorksPreviewComponent,
    WorkComponent
  ],
  providers: [
    WorksService
  ],
  exports: [
    WorksPreviewComponent
  ]
})
export class WorksModule { }
