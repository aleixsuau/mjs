import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventsService } from './../../../agenda/services/events.service';


@Injectable()
export class AgendaResolverService implements Resolve<IEvent> {
  constructor(private eventsService: EventsService) {}

  resolve(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
    const id = activeRoute.params['id'];
    console.log('activeRoute: ', id, activeRoute, state);
    return this.eventsService
                  .readOne(id)
                  .take(1);
  }
}
