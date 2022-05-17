import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCourses from './reducers/courses.reducer';
import * as fromClasses from './reducers/classes.reducer';
import * as fromNotifications from './reducers/feature-notification.reducer';
import * as fromRegistrations from './reducers/registrations.reducer';

import { CourseEnrollmentViewModel } from '../models';
import { selectUserName } from '../../auth/state';
import { RegistrationRequest } from './actions/registration.actions';
export const featureName = 'featureCourses';

export interface CoursesState {
  courses: fromCourses.CoursesState;
  classes: fromClasses.ClassesState;
  notification: fromNotifications.FeatureNotificationsState;
  registrations: fromRegistrations.RegistrationsState
}

export const reducers: ActionReducerMap<CoursesState> = {
  courses: fromCourses.reducer,
  classes: fromClasses.reducer,
  notification: fromNotifications.reducer,
  registrations: fromRegistrations.reducer
};

const selectFeature = createFeatureSelector<CoursesState>(featureName);

const selectCoursesBranch = createSelector(selectFeature, (f) => f.courses);
const selectClassesBranch = createSelector(selectFeature, (f) => f.classes);

const selectRegistrationsBranch = createSelector(selectFeature, f => f.registrations);


const { selectAll: selectAllRegistrationEntities } = fromRegistrations.adapter.getSelectors(selectRegistrationsBranch);

export const selectAllRegistrations = selectAllRegistrationEntities;
const selectNotificationBranch = createSelector(
  selectFeature,
  (f) => f.notification
);

export const selectNotificationNeeded = createSelector(
  selectNotificationBranch,
  (b) => b.hasErrors
);

export const selectNotificationMessage = createSelector(
  selectNotificationBranch,
  (b) => b.errorMessage
);

const {
  selectAll: selectAllCoursesArray,
  selectEntities: selectCourseEntities,
} = fromCourses.adapter.getSelectors(selectCoursesBranch);

const { selectEntities: selectAllClassesEntities } =
  fromClasses.adapter.getSelectors(selectClassesBranch);

export const selectAllCourses = selectAllCoursesArray;

export const selectCourseById = (id: string) =>
  createSelector(selectCourseEntities, (entities) => entities[id]);

export const selectClassDatesById = (courseId: string) =>
  createSelector(
    selectAllClassesEntities,
    (entities) => entities[courseId]?.offerings
  );

export const selectCourseAndUserForRegistration = (
  courseId: string,
  date: string
) =>
  createSelector(selectCourseById(courseId), selectUserName, (course, user) => {
    return {
      courseId: courseId,
      courseName: course?.title,
      dateOfCourse: date,
      user,
    } as RegistrationRequest;
  });

export const selectCourseEnrollmentViewModel = (courseId: string) =>
  createSelector(
    selectCourseEntities,
    selectAllClassesEntities,
    selectUserName,
    (courses, classes, user) => {
      // talk about this...
      const course = courses[courseId];
      const offerings =
        classes[courseId]?.offerings.map((offering) => ({
          ...offering,
          numberOfDays: daysBetween(offering.startDate, offering.endDate),
        })) || [];
      if (course) {
        return {
          course: course,
          dates: offerings,
          user,
        } as CourseEnrollmentViewModel;
      } else {
        return undefined;
      }
    }
  );

function daysBetween(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = diffInTime / (1000 * 3600 * 24);
  return differenceInDays;
}
