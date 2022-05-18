import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCourses from './reducers/courses.reducer';
import * as fromClasses from './reducers/classes.reducer';
import * as fromNotifications from './reducers/feature-notification.reducer';
import * as fromRegistrations from './reducers/registrations.reducer';

import { CourseEnrollmentViewModel, RegistrationsViewModel, RegistrationItemViewModel } from '../models';
import { selectUserName } from 'auth-lib';
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

const { selectEntities: selectAllClassesEntities, selectAll: selectAllClassesArray } =
  fromClasses.adapter.getSelectors(selectClassesBranch);



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

  export const selectAllCourses = selectAllCoursesArray;
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

const selectDateForRegistration = createSelector(
  selectAllClassesArray,
  (classes) => {
    // this will stink.
   // go through each class, and create a new item in an array with the id, the startDate, and the endDate
   // such that the id and startDate are the "unique" parts.
    const x = classes.reduce((lhs: ClassDateInfo[], rhs) => {
      let smooshed = rhs.offerings.map(r => ({ startDate: r.startDate, endDate: r.endDate}));
      let newThing:ClassDateInfo[] =smooshed.map(s => ({
        id: rhs.id,
        startDate: s.startDate,
        endDate: s.endDate
      }))
      return [
        ...lhs,
       ...newThing

      ]
    }, [])
    return x;
  }
)

interface ClassDateInfo {
  id: string;
  startDate: string;
  endDate: string;
}
const selectRegistrationItemViewModels = createSelector(
  selectAllRegistrationEntities,
  selectDateForRegistration,
  (registrations, endDate) => {
    return registrations.map(registration => {
      const endDateInfo =  endDate.find(e => e.id === registration.courseId && e.startDate === registration.dateOfCourse)?.endDate;
      return {
        id: registration.registrationId,
        courseName: registration.courseName,
        startDate: registration.dateOfCourse,
        endDate: endDateInfo,
        cancellationAllowed: true,
        endTime: '5:00 PM ET',
        startTime: '9:30 AM ET',
        invitationSent: false,
        status: registration.status
      } as RegistrationItemViewModel
    })
  }
)

export const selectRegistrationListViewModel = createSelector(
  selectRegistrationItemViewModels,
  (registrations) => {
    console.log(registrations);
    return {

      registrations
    } as RegistrationsViewModel;
  }
)
