describe('The Landing Page', () => {
  it('redirects to the home route', () => {
    cy.visit('/');
    cy.url().should('match', /\/home$/);
  });
  it('has the login button', () => {
    cy.get('[data-auth-login-button]').should('exist').contains('Log In');
  });

  it('does not have the logout button', () => {
    cy.get('[data-auth-logout-button]').should('not.exist');
  });
  it('displays the home component', () => {
    cy.get('[data-home-component]').should('exist');
  });

  describe('navigation', () => {

    beforeEach(() => {
      cy.visit('/');
    })

  describe('course list link', () => {
    it('has the course list link', () => {
      cy.get('[data-nav-course-list]').should('exist');

    });
    it('shows the course list component', () => {
      cy.get('[data-nav-course-list]').click();
      cy.get('[data-courses-component]').should('exist');
    })

  });

  describe('the hypertheory training link', () => {

    it('has the link', () => {})

    it('shows the home component', () => {})
  });
});
});
