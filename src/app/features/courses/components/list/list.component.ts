import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserIsAuthenticated } from 'auth-lib';
import { AuthEvents } from 'auth-lib';
import { selectAllCourses, selectNotificationMessage, selectNotificationNeeded } from '../../state';
import { CoursesEntity } from '../../state/reducers/courses.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses$!: Observable<CoursesEntity[]>;
  loggedIn$!: Observable<boolean>;
  hasNotification$!: Observable<boolean>;
  errorMessage$!: Observable<string | undefined>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(selectAllCourses);
    this.loggedIn$ = this.store.select(selectUserIsAuthenticated);
    this.hasNotification$ = this.store.select(selectNotificationNeeded);
    this.errorMessage$ = this.store.select(selectNotificationMessage);
  }

  login(courseId: string) {
    this.store.dispatch(
      AuthEvents.loginRequested({
        redirectUrl: this.router.url + `/${courseId}`,
      })
    );
  }
}
