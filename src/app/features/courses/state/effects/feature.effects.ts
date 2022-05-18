import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ClassesCommands } from '../actions/classes.actions';
import { CoursesCommands } from '../actions/courses.actions';
import { FeatureEvents } from '../actions/feature.actions';
import { RegistrationCommands } from '../actions/registration.actions';

@Injectable()
export class FeatureEffects {
  onFeatureStartedLoadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.FeatureEntered),
      map(() => CoursesCommands.LoadCourses())
    );
  });

  onFeatureStartedLoadSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.FeatureEntered),
      map(() => ClassesCommands.LoadClasses())
    );
  });

  onFeatureStartedLoadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.FeatureEntered),
      map(() => RegistrationCommands.loadRegistrations())
    );
  });

  constructor(private actions$: Actions) {}
}
