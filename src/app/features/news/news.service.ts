import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';

import { CustomHttpService } from './../../core/services/custom-http/custom-http.service';

@Injectable()
export class NewsService {

    private store: IEvent[] = [];
    private _collection: BehaviorSubject<IEvent[]> = new BehaviorSubject([]);
    readonly collection: Observable<IEvent[]> = this._collection.asObservable().share();
    private endPoint: string;

    constructor(
        private customHttpService: CustomHttpService,
        private appConfig: AppConfig,
    ) {
        this.endPoint = `${this.appConfig.api}news/`;
        this.read();
    }

    create(item: IEvent) {
        console.log('create Item:', item);
        this.customHttpService
                .post(`${this.endPoint}`, item)
                .subscribe(
                    (response) => {
                        this.store.push(response.json().data);
                        this._collection.next(this.store);
                        console.log('pushed item: ', response);
                    },
                    this.handleError
                );
    }

    read() {
        this.customHttpService
                .get(`${this.endPoint}`)
                .subscribe(
                    (response: Response) => {
                        this.store = Object.assign([], response.json().data);
                        this._collection.next(this.store);
                    },
                    this.handleError
                );
    }

    update(item) {
        this.customHttpService
                .put(`${this.endPoint}/${item.id}`, item)
                .subscribe(
                    (response: Response) => {
                        this.store.forEach((storedItem, i) => {
                            if (item.id === storedItem.id) {
                                this.store[i] = item;
                            }
                        });
                        this._collection.next(this.store);
                    },
                    this.handleError
                );
    }

    delete(item) {
        const id = typeof item === 'object' ? item.id : item;
        this.customHttpService
                .delete(`${this.endPoint}/${id}`)
                .subscribe(
                    (response: Response) => {
                        this.store.forEach((storedItem, i) => {
                            if (item.id === storedItem.id) {
                                this.store.splice(i, 1);
                            }
                        });
                        this._collection.next(this.store);
                    },
                    this.handleError
                );
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

