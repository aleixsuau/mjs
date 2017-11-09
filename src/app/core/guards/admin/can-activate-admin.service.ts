import { UserService } from './../../services/user/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateAdminService {

  constructor(
    private userService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService
                  .user$
                  .map((user) => {
                    return user && user.role === 'admin';
                  });
  }

}
