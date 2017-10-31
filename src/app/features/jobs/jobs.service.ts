import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/publishReplay';


import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class JobsService {

    private store: IEvent[] = [];
    private _collection: BehaviorSubject<IEvent[]> = new BehaviorSubject([]);
    readonly collection$: Observable<IEvent[]> = this._collection.asObservable().publishReplay(1).refCount();
    private endPoint: string;

    constructor(
      private db: AngularFireDatabase,
    ) {
        this.endPoint = `jobs`;
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

