import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { JobsService } from './jobs.service';

import { JobsPreviewComponent } from './containers/jobs-preview/jobs-preview.component';
import { JobComponent } from './components/job/job.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    JobsPreviewComponent,
    JobComponent
  ],
  providers: [
    JobsService
  ],
  exports: [
    JobsPreviewComponent
  ]
})
export class JobsModule { }
