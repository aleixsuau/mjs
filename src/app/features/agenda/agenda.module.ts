import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { AgendaPreviewComponent } from './containers/agenda-preview/agenda-preview.component';
import { EventComponent } from './components/event/event.component';

import { EventsService } from './services/events.service';
import { AgendaResolverService } from './services/agenda-resolver/agenda-resolver.service';
import { AgendaComponent } from './containers/agenda/agenda.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AgendaPreviewComponent,
    EventComponent,
    AgendaComponent
  ],
  providers: [
    EventsService,
    AgendaResolverService
  ],
  exports: [
    AgendaPreviewComponent
  ]
})
export class AgendaModule { }
