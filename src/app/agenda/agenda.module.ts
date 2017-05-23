import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { AgendaComponent } from './agenda.component';
import { AgendaService } from './agenda.service';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AgendaComponent
  ],
  providers: [
    AgendaService
  ],
  exports: [
    AgendaComponent
  ]
})
export class AgendaModule { }
