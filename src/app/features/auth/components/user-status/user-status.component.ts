import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserIsAuthenticated, selectUserName } from '../../state';
import { AuthEvents } from '../../state/actions/auth.actions';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css'],
})
export class UserStatusComponent implements OnInit {
  loggedIn$!: Observable<boolean>;
  userName$!: Observable<string | undefined>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectUserIsAuthenticated);
    this.userName$ = this.store.select(selectUserName);
  }

  requestLogin() {
    this.store.dispatch(AuthEvents.loginRequested({}));
  }
  requestLogout() {
    this.store.dispatch(AuthEvents.logoutRequested());
  }
}
