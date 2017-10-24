import { CustomHttpService } from './../../../core/services/custom-http/custom-http.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from './../../../../environments/environment.prod';

@Injectable()
export class UsersService {

    private store: IUser[] = [];
    private _collection: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    readonly collection: Observable<IUser[]> = this._collection.asObservable().share();
    private endPoint: string;

    constructor(
      private db: AngularFireDatabase,
    ) {
        this.endPoint = `users`;
        this.read();
    }

    create(user: IUser) {
        return this.db.object(`${this.endPoint}`)
                        .update({ [user.uid]: user});
    }

    read() {
      this.db.list(this.endPoint)
                .valueChanges()
                .subscribe((response: IUser[]) => {
                  this.store = response;
                  this._collection.next(this.store);
                });
    }

    readOne(id: string): Observable<IUser> {
      return this.db.object(`${this.endPoint}/${id}`)
                        .valueChanges();
    }

    update(item) {
      this.db.object(`${this.endPoint}/${item.uid}`).update(item);
    }

    delete(item) {
        this.db.object(`${this.endPoint}/${item.uid}`).remove();
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

