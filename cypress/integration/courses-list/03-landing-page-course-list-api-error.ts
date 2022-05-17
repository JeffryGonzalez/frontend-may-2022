describe('courses api returns a 404', () => {
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
  describe('what', () => {

        it('what', () => {

        });
  });
});
