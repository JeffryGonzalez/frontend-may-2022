import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CoursesDocuments } from '../actions/courses.actions';

export interface CoursesEntity {
  id: string;
  title: string;
  blurb: string;
  category: string;
}

export interface CoursesState extends EntityState<CoursesEntity> {}

export const adapter = createEntityAdapter<CoursesEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(CoursesDocuments.Courses, (s, a) => adapter.setAll(a.payload, s))
);
