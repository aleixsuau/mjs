import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../services/auth/auth.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Flag to show/hide login menu
  showLogin: boolean;
  $user: Observable<IUser>;
  @Output()
  onMenuClick: EventEmitter<string> = new EventEmitter();

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.$user = this.authService
                        .$user
                        .map((user) => {
                          // Hide Login Menu if the user is logged
                          if (user) {
                            this.showLogin = false;
                          } else {
                            this.showLogin = true;
                          }
                          return user;
                        });
  }

  emitToggle() {
    this.onMenuClick.emit();
  }

}
