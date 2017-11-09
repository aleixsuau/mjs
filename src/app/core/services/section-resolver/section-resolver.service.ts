import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AgendaService } from './../agenda/agenda.service';
import { NewsService } from './../news/news.service';
import { JobsService } from './../jobs/jobs.service';


@Injectable()
export class SectionResolverService implements Resolve<any> {
  constructor(
    private agendaService: AgendaService,
    private jobsService: JobsService,
    private newsService: NewsService,
  ) {}

  resolve(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const itemId = activeRoute.params && activeRoute.params.id;
    const section = activeRoute.url[0].path;
    const service = this[`${section}Service`];
    const collection$ = service.collection$
                                  .filter(data => data.length)
                                  .take(1);

    if (itemId) {
      const highlightItem$ = service.readOne(itemId).take(1);
      return Observable.forkJoin(highlightItem$, collection$)
                       .map((data) => {
                          const resolvedData = { highlight: data[0], collection: data[1], section };
                          return resolvedData;
                       });
    }

    return collection$.map((data) => {
                          const resolvedData = { collection: data, section };
                          return resolvedData;
                       });
  }
}
