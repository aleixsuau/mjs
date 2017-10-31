import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth/auth';

import { UserService } from './../user/user.service';
import { UsersService } from './../users/users.service';



@Injectable()
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private usersService: UsersService,
    private router: Router,
  ) {
    // Subscribe to Auth changes to react
    this.angularFireAuth
            .authState
            .subscribe((response) => {
              if (response) {
                const { displayName, email, photoURL, emailVerified, uid } = response;
                const user: IUser = { displayName, email, photoURL, emailVerified, uid };
                this.checkIfUserExist(user)
                        .subscribe((ddbbUser) => {
                          if (!ddbbUser) {
                            this.createUser(user);
                          } else {
                            this.setUser(ddbbUser);
                          }
                        });
              } else {
                this.setUser(null);
                this.router.navigate(['/']);
              }
            });
  }

  checkIfUserExist(user: IUser): Observable<any> {
    return this.usersService
                  .readOne(user.uid)
                  .take(1);
  }

  createUser(user: IUser) {
    const newUser = {...user, role: 'user'};
    this.usersService
            .create(newUser)
            .then((response) => {
              this.setUser(newUser);
            });
  }

  setUser(user: IUser) {
    this.userService.setUser(user);
  }

  logOut() {
    this.angularFireAuth.auth.signOut();
  }

}
