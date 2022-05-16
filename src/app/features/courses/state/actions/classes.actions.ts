import { createAction, props } from '@ngrx/store';
import { ClassesEntity } from '../reducers/classes.reducer';

export const ClassesEvents = {};

export const ClassesCommands = {
  LoadClasses: createAction('[courses] load classes'),
};

export const ClassesDocuments = {
  Classes: createAction(
    '[courses] classes',
    props<{ payload: ClassesEntity[] }>()
  ),
};
