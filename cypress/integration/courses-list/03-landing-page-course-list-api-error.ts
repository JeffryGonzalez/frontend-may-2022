describe('courses api returns a 404', () => {

  describe('the error notification is displayed', () => {
    beforeEach(() => {
      cy.intercept('/api/course-catalog/courses/', {
        statusCode: 404,

      });
      cy.intercept('/api/scheduling/schedule', {
        statusCode: 200,
        body: {
          data: [],
        },
      });
      cy.visit('/courses/list');
    });
        it('notification is displayed', () => {
          cy.get('[data-courses-list-error-courses-notification]').should('exist');
        });

        it('the courses empty notification is gone', () => {
            // decide about this.
        });
  });
  describe('the error notification should not be shown if there are no errors', () => {

    beforeEach(() => {

      cy.intercept('/api/course-catalog/courses/', {
        statusCode: 200,
        body: {data: []}

      });
      cy.visit('/courses/list');
    })

    it('should not display the notification', () => {

        cy.get('[data-courses-list-error-courses-notification]').should('not.exist');

    })

  });
});
