import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request,
  XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CustomHttpService extends Http {

  private _loading: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  readonly loading: Observable<Boolean> = this._loading.asObservable().share();

  private _error: BehaviorSubject<any> = new BehaviorSubject({});
  readonly error: Observable<any> = this._error.asObservable().share();

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
  ) {
    super(backend, defaultOptions);
  }

  // Intercept the Http action & track its status (loading/not loading, error)
  intercept(action: string, url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    this._loading.next(true);
    console.log('Intercept: ', action, url);
    return super[action](url, body, options)
              .do(
                (res: Response) => this._loading.next(false),
                (error: any) => this._error.next(error),
                () => this._loading.next(false)
              );
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    console.log('Get: ', url);
    return this.intercept('get', url, null, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('post', url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('put', url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('delete', url, null, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('patch', url, body, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('head', url, null, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept('options', url, null, options);
  }
};

export function customHttpFactory (backend: XHRBackend, defaultOptions: RequestOptions) {
    return new CustomHttpService(backend, defaultOptions);
};

export let customHttpProvider = {
  provide: CustomHttpService,
  useFactory: customHttpFactory,
  deps: [ XHRBackend, RequestOptions ]
};
