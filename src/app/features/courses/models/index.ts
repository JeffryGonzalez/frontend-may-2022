import { Offering } from '../state/reducers/classes.reducer';
import { CoursesEntity } from '../state/reducers/courses.reducer';

export interface CourseEnrollmentViewModel {
  course: CoursesEntity;
  dates: Offering[];
  user: string;
}


export interface RegistrationsViewModel {
  registrations: RegistrationItemViewModel[]
}


export interface RegistrationItemViewModel {
  id: string;
  courseName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string; // TODO, make a type for this.
  cancellationAllowed: boolean;
  invitationSent: boolean;
}
