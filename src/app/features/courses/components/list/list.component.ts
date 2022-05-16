import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserIsAuthenticated } from 'src/app/features/auth/state';
import { AuthEvents } from 'src/app/features/auth/state/actions/auth.actions';
import { selectAllCourses } from '../../state';
import { CoursesEntity } from '../../state/reducers/courses.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses$!: Observable<CoursesEntity[]>;
  loggedIn$!: Observable<boolean>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(selectAllCourses);
    this.loggedIn$ = this.store.select(selectUserIsAuthenticated);
  }

  login(courseId: string) {
    this.store.dispatch(
      AuthEvents.loginRequested({
        redirectUrl: this.router.url + `/${courseId}`,
      })
    );
  }
}
