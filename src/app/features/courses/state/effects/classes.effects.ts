import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassesCommands, ClassesDocuments } from '../actions/classes.actions';
import { ClassesEntity, Offering } from '../reducers/classes.reducer';

@Injectable()
export class ClassesEffects {
  readonly baseUrl = environment.apiBaseUrl + 'api/scheduling/schedule';

  loadClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassesCommands.LoadClasses),
      switchMap(() =>
        this.client.get<{ data: ClassesApiResponse }>(this.baseUrl).pipe(
          map((r) => r.data),
          map((data) =>
            Object.keys(data).map(
              (key) =>
                ({
                  id: key,
                  offerings: data[key].map((t) => ({ ...t })),
                } as ClassesEntity)
            )
          ),
          map((payload) => ClassesDocuments.Classes({ payload }))
        )
      )
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}

interface ClassesApiResponse {
  [key: string]: Offering[];
}
