import { CustomHttpService } from './../../../core/services/custom-http/custom-http.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from './../../../../environments/environment.prod';


@Injectable()
export class EventsService {

    private store: IEvent[] = [];
    private _collection: BehaviorSubject<IEvent[]> = new BehaviorSubject([]);
    readonly collection: Observable<IEvent[]> = this._collection.asObservable().share();
    private endPoint: string;

    constructor(
      private db: AngularFireDatabase,
    ) {
        this.endPoint = `events`;
        this.read();
    }

    create(item: IEvent) {
        const id = this.db.list(this.endPoint).push(null).key;
        item.id = id;
        this.db.list(this.endPoint).set(id, item);
    }

    read() {
      this.db.list(this.endPoint)
                .valueChanges()
                .subscribe((response) => {
                  this.store = response as IEvent[];
                  this._collection.next(this.store);
                });
    }

    readOne(id: string): Observable<IEvent> {
      return this.db.object(`${this.endPoint}/${id}`).valueChanges();
    }

    update(item) {
      this.db.object(`${this.endPoint}/${item.id}`).update(item);
    }

    delete(item) {
        this.db.object(`${this.endPoint}/${item.id}`).remove();
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}

