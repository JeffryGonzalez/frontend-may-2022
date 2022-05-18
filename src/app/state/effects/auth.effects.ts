import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  AuthEvents,
} from 'auth-lib';

@Injectable()
export class AppAuthEffects {
  loginRequested$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthEvents.loginRequested),

        tap(({ redirectUrl }) =>
          this.router.navigate(['login'], {
            queryParams: { redirect: redirectUrl },
          })
        )
      );
    },
    { dispatch: false }
  );
  constructor(private actions$: Actions, private router: Router) {}
}
