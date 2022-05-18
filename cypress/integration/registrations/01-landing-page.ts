describe('the registrations landing page', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      fixture: 'courses-api/happy.json',
    });
    cy.intercept('/api/scheduling/schedule', {
      fixture: 'enrollment/schedule.json'
    });

    cy.intercept('/api/registrations', {
      fixture: 'registrations/registrations.json'
    })
    cy.visit('/courses/registrations')
  })

  describe('all that stuff we did on the courses page', () => {
    it('has all the stuff', () => {
      // so, go make sure the thing is displaying property AS HARDCODED.
    });

  });

});