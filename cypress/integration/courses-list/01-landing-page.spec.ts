import { CourseListLocators as locators } from "../../utils/course-list-locators";
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

  // it('delete me', () => {
  //   Object.keys(locators).forEach(key => {
  //     console.log(locators[key]("99"));
  //   })
  // })
  it('should go to the default route', () => {
    cy.visit('/courses');
    cy.url().should('match', /\/courses\/list$/); // "/courses/list"
  });

  describe('the list items - not logged in', () => {
    describe('the first list item', () => {
      it('exists', () => {
        cy.get(locators.getCourseListItem("0")).should('exist');
      });
      it('should display the title from the API', () => {
        cy.get(locators.getCourseListItemHeader("0")).should(
          'contain.text',
          'Country Line Dancing'
        );
      });
      it('should display the overview', () => {
        cy.get(locators.getCourseListOverview("0")).should(
          'contain.text',
          'Country Line Dancing is training for Angular'
        );

      });
      it('should display the log in link', () => {
        cy.get(locators.getCourseListItemLoginLink('0')).should('exist');
      });
      it('should not display the enroll link', () => {
        cy.get(locators.getCourseListItemEnrollLink('0')).should('not.exist');
      });

    });

    describe('the second list item', () => {
      it('exists', () => {
        cy.get(locators.getCourseListItem("0")).should('exist');
      });
    });
  });

  describe('list items - user logged in', () => {
    beforeEach(() => {
      cy.visit('/courses/list');
      cy.get(locators.getCourseListItemLoginLink("0")).click();

     cy.loginUser();
     

    });

    it('should display the enroll link', () => {
      cy.get(locators.getCourseListItemLoginLink("0")).should('not.exist');
    });
    it('should not display the log in link', () => {
      cy.get(locators.getCourseListItemEnrollLink("0")).should('exist');
    });
  });
});
