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
});
