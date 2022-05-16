import { Offering } from '../state/reducers/classes.reducer';
import { CoursesEntity } from '../state/reducers/courses.reducer';

export interface CourseEnrollmentViewModel {
  course: CoursesEntity;
  dates: Offering[];
  user: string;
}
