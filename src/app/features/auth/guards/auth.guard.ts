import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,

} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserIsAuthenticated } from '../state';


@Injectable()
export class UserIsAuthenticatedGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  )
     {
    return this.store.select(selectUserIsAuthenticated);
  }
}
