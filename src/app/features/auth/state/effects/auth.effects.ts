import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import {
  AuthCommands,
  AuthDocuments,
  AuthEvents,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  logInUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthCommands.loginUser),
      map((a) => AuthDocuments.user({ payload: a.userName }))
    );
  });

  logInUserRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthCommands.loginUser),

        tap((u) => this.router.navigateByUrl(u.redirectUrl || '/home'))
      );
    },
    { dispatch: false }
  );

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthEvents.logoutRequested),
      map(() => AuthDocuments.user({ payload: undefined }))
    );
  });
  constructor(private actions$: Actions, private router: Router) {}
}
