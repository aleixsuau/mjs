import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AgendaService } from './../agenda/agenda.service';

@Injectable()
export class AgendaResolverService implements Resolve<IEvent> {
  constructor(private agendaService: AgendaService) {}

  resolve(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
    const id = activeRoute.params['id'];
    return this.agendaService
                  .readOne(id)
                  .take(1);
  }
}
