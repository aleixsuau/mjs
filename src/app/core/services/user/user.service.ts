import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AngularFireDatabase } from 'angularfire2/database';

import { CustomHttpService } from './../../../core/services/custom-http/custom-http.service';
import { UsersService } from './../users/users.service';

import { environment } from './../../../../environments/environment.prod';

@Injectable()
export class UserService {
  private _user: BehaviorSubject<IUser> = new BehaviorSubject(null);
  readonly user$: Observable<IUser> = this._user.asObservable().publishReplay(1).refCount();
  isLogged: boolean;
  endPoint: string;

  constructor(
    private db: AngularFireDatabase,
    private usersService: UsersService,
  ) {
    this.endPoint = `users`;
  }

  setUser(user: IUser) {
    this._user.next(user);
  }

}

