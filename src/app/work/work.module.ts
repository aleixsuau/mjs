import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { WorkComponent } from './work.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WorkComponent
  ],
  exports: [
    WorkComponent
  ]
})
export class WorkModule { }
