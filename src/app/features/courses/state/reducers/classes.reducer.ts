import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ClassesDocuments } from '../actions/classes.actions';

export interface ClassesEntity {
  id: string;
  offerings: Offering[];
}
export interface Offering {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

export interface ClassesState extends EntityState<ClassesEntity> {}

export const adapter = createEntityAdapter<ClassesEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(ClassesDocuments.Classes, (s, a) => adapter.addMany(a.payload, s))
);
