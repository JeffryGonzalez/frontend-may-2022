import { createAction, props } from '@ngrx/store';
import { CoursesEntity } from '../reducers/courses.reducer';

export const CoursesEvents = {};

export const CoursesCommands = {
  LoadCourses: createAction('[courses] load courses'),
};

export const CoursesDocuments = {
  Courses: createAction(
    '[courses] courses',
    props<{ payload: CoursesEntity[] }>()
  ),
};
