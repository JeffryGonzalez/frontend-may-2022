import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { RegistrationDocuments } from '../actions/registration.actions';
import { RegistrationStatus } from '../types';

export interface RegistrationEntity {
  registrationId: string;
  courseId: string;
  courseName: string;
  dateOfCourse: string;
  user: string;
  status: RegistrationStatus;
}

export interface RegistrationsState extends EntityState<RegistrationEntity> {}

export const adapter = createEntityAdapter<RegistrationEntity>({
  selectId: (e) => e.courseId,
});

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(RegistrationDocuments.Registrations, (s, a) =>
    adapter.setAll(a.payload, s)
  ),
  on(RegistrationDocuments.Registration, (s, a) =>
    adapter.upsertOne(a.payload, s)
  )
);
