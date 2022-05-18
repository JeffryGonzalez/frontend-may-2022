describe('accessibility for the home page', () => {
  beforeEach(() => {
    cy.visit('/');
  })
      it('should pass accesssibility', () => {
        cy.checkForDetectableAccessibilityIssues();
        // cy.get('this-magic-thing').checkForDetectableAccessibilityIssues();
      });
});
