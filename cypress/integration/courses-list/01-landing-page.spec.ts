describe('the courses list', () => {
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
  });
  it('should go to the default route', () => {
    cy.visit('/courses');
    cy.url().should('match', /\/courses\/list$/); // "/courses/list"
  });

  describe('the list items - not logged in', () => {
    describe('the first list item', () => {
      it('exists', () => {
        cy.get('[data-courses-list-item="0"]').should('exist');
      });
      it('should display the title from the API', () => {
        cy.get('[data-courses-list-item-header="0"]').should(
          'contain.text',
          'Country Line Dancing'
        );
      });
      it('should display the overview', () => {
        cy.get('[data-courses-list-item-overview="0"]').should(
          'contain.text',
          'Country Line Dancing is training for Angular'
        );
      });
      it('should display the log in link', () => {
        cy.get('[data-course-list-item-login-link="0"]').should('exist');
      });
      it('should not display the enroll link', () => {
        cy.get('[data-course-list-item-enroll-link="0"]').should('not.exist');
      });
    });

    describe('the second list item', () => {
      it('exists', () => {
        cy.get('[data-courses-list-item="1"]').should('exist');
      });
    });
  });

  describe('list items - user logged in', () => {
    beforeEach(() => {

    });
  
    it('should display the enroll link', () => {

    });
    it('should not display the log in link', () => {

    });
  });
});
