import { createAction, props } from '@ngrx/store';
import { RegistrationEntity } from '../reducers/registrations.reducer';

export const RegistrationEvents = {
  registrationRequested: createAction(
    '[courses] registration requested',
    props<{ payload: { course: string; date: string } }>()
  ),
};

export const RegistrationCommands = {
  createRegistration: createAction(
    '[courses] create registration',
    props<{ payload: RegistrationRequest }>()
  ),
  loadRegistrations: createAction('[courses] load registrations'),
};

export const RegistrationDocuments = {
  Registrations: createAction(
    '[courses] registrations',
    props<{ payload: RegistrationEntity[] }>()
  ),
  Registration: createAction(
    '[courses] registration',
    props<{ payload: RegistrationEntity }>()
  ),
};

export interface RegistrationRequest {
  courseId: string;
  courseName: string;
  user: string;
  dateOfCourse: string;
}
