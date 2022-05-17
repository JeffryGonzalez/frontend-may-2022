import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs';
import { selectCourseAndUserForRegistration } from '..';
import {
  RegistrationCommands,
  RegistrationEvents,
} from '../actions/registration.actions';

@Injectable()
export class RegistrationEffects {
  sendRegistration$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationCommands.createRegistration),
        mergeMap((a) => this.http.post('/api/registrations', a.payload))
      );
    },
    { dispatch: false }
  );

  createRegistrationRequest$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationEvents.registrationRequested),
        concatLatestFrom((a) =>
          this.store.select(
            selectCourseAndUserForRegistration(a.payload.course, a.payload.date)
          )
        ),
        map(([_, payload]) =>
          RegistrationCommands.createRegistration({ payload })
        )
      );
    },
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}
}
