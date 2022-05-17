import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { RegistrationDocuments } from '../actions/registration.actions';

export interface RegistrationEntity {
  registrationId: string;
  courseId: string;
  courseName: string;
  dateOfCourse: string;
  user: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export interface RegistrationsState extends EntityState<RegistrationEntity> {

}

export const adapter = createEntityAdapter<RegistrationEntity>({
  selectId: (e) => e.courseId
});

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(RegistrationDocuments.Registration, (s,a) => adapter.upsertOne(a.payload, s))
);

