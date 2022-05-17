import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoursesCommands, CoursesDocuments } from '../actions/courses.actions';
import { NotificationsCommands } from '../actions/notifications.actions';
import { CoursesEntity } from '../reducers/courses.reducer';
@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesCommands.LoadCourses),
      switchMap(() =>
        this.client
          .get<{ data: CoursesEntity[] }>(this.baseUrl)
          .pipe(map(({ data }) => CoursesDocuments.Courses({ payload: data })),
            catchError(() => of(NotificationsCommands.DisplayApiNotification({ payload: { source: 'Courses', message: 'Courses Could Not Be Loaded'}})))
          )
      )
    );
  });
  readonly baseUrl = environment.apiBaseUrl + 'api/course-catalog/courses/';
  constructor(private actions$: Actions, private client: HttpClient) {}
}
