import { CourseListLocators as locators } from '../../utils/course-list-locators';
describe('course data notifications', () => {
  describe('the course list with no courses', () => {
    beforeEach(() => {
      cy.intercept('/api/course-catalog/courses/', {
        statusCode: 200,
        body: {
          data: [],
        },
      });
      cy.intercept('/api/scheduling/schedule', {
        statusCode: 200,
        body: {
          data: [],
        },
      });
      cy.visit('/courses/list');
    });

    it('The Notification Should Be Shown', () => {
      cy.get(locators.getCourseListEmtpyNotification()).should('exist');
    });
  });

  describe('Notification should not be shown if there are courses', () => {
    beforeEach(() => {
      cy.intercept('/api/course-catalog/courses/', {
        fixture: 'courses-api/happy.json',
      });
      cy.intercept('/api/scheduling/schedule', {
        statusCode: 200,
        body: {
          data: [],
        },
      });
      cy.visit('/courses/list');
    });

    it('does not display the notification', () => {
      cy.get(locators.getCourseListEmtpyNotification()).should('not.exist');
    });
  });
});
