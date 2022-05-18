import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { selectCourseAndUserForRegistration } from '..';
import {
  RegistrationCommands,
  RegistrationDocuments,
  RegistrationEvents,
} from '../actions/registration.actions';
import { RegistrationEntity } from '../reducers/registrations.reducer';

@Injectable()
export class RegistrationEffects {
  loadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationCommands.loadRegistrations),
      switchMap(() =>
        this.http
          .get<{ data: RegistrationEntity[] }>('/api/registrations')
          .pipe(
            map(({ data }) =>
              RegistrationDocuments.Registrations({ payload: data })
            )
          )
      )
    );
  });

  sendThemToTheRegistatrionPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationDocuments.Registration),
        tap(() => this.router.navigate(['../courses/registrations']))
      );
    },
    { dispatch: false }
  );

  // this turns a createRegistation =>(send it to the api) => Registration
  sendRegistration$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationCommands.createRegistration),
        mergeMap((a) =>
          this.http
            .post<RegistrationEntity>('/api/registrations', a.payload)
            .pipe(
              map((payload) => RegistrationDocuments.Registration({ payload }))
            )
        )
      );
    },
    { dispatch: true }
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
    private http: HttpClient,
    private router: Router
  ) {}
}
