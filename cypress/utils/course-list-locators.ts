
export const CourseListLocators = {
  getCourseListEmtpyNotification:() => '[data-courses-list-no-courses-notification]',
  getCourseListItem: (id:string) => `[data-courses-list-item="${id}"]`,
  getCourseListItemHeader: (id:string) => buildMatcher("header", id),
  getCourseListOverview: (id:string) => buildMatcher("overview", id),
  getCourseListItemLoginLink: (id:string) => buildMatcher("login-link", id),
  getCourseListItemEnrollLink: (id:string) => buildMatcher("enroll-link", id),
}

function buildMatcher(thing:string, id:string) {
  return `[data-courses-list-item-${thing}="${id}"]`
}

