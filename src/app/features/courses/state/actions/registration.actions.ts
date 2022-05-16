import { createAction, props } from '@ngrx/store';

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
};

export const RegistrationDocuments = {};

export interface RegistrationRequest {
  courseId: string;
  courseName: string;
  user: string;
  dateOfCourse: string;
}
