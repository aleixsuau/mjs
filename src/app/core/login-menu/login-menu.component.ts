import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../services/user/user.service';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
  animations: [
    trigger('rolling', [
      transition('void => *', [
        style({ transform: 'translateX(100%) rotate(-10deg)'}),
        animate('200ms ease-in')
      ])
    ]),
  ]
})
export class LoginMenuComponent implements OnInit {

  user$: Observable<IUser>;
  // Flag to mark when the user is over this menu
  over: string;
  @Input()
  show: boolean;
  @Output()
  logged: EventEmitter<any> = new EventEmitter;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  logOut() {
    this.authService.logOut();
  }

  onSignInSuccess() {
    this.logged.emit(true);
  }

}
