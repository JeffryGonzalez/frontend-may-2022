
import { RegistrationRequest } from '../../../src/app/features/courses/state/actions/registration.actions'
const fixtureData = [
  { startDate: '2022-06-07T00:00:00',  display: 'Jun 7, 2022 - Jun 12, 2022 (5 days) ' },
  { startDate: '2022-08-01T00:00:00', display: 'Aug 1, 2022 - Aug 4, 2022 (3 days)' },
];

describe('enrolling for a course', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      fixture: 'enrollment/courses.json',
    });
    cy.intercept('/api/scheduling/schedule', {
      fixture: 'enrollment/schedule.json'
    });

    cy.goToRoute('/login');
    cy.loginUser('Sue');
    // cy.goToRoute('/courses/enroll/course1');
    cy.get('[data-nav-course-list]').click();
    cy.get('[data-courses-list-item-enroll-link="0"]').click();
  });
  // log them in
  // Go to an enrollment
  // -
  it('the dates are displayed properly', () => {
    cy.get('[data-enrollment-date-list]>option').each(
      (option: HTMLOptionElement, idx) => {
        cy.wrap(option).should(
          'contain.text',
          fixtureData[idx].display
        ).should('have.value', fixtureData[idx].startDate);
      }
    );
  });

  describe('submitting the enrollment - just look at the api call', () => {

      beforeEach(() => {
        // make up some crap.
        cy.intercept('POST', '/api/registrations', {
         body: {
            "registrationId": "registration1",
            "courseId": "course1",
            "courseName": "Country Line Dancing",
            "dateOfCourse": "2022-06-07T00:00:00",
            "user": "Sue",
            "status": "PENDING"
        }

        }).as('registrationsApi')
      })
        it('shows them the enrollment', () => {
          cy.get('[data-enrollment-date-list]').select(fixtureData[0].startDate);
          cy.get('button[type="submit"]').click();

          cy.wait('@registrationsApi').then((inter) => {
            assert.isNotNull(inter.request.body);
            const body = inter.request.body as RegistrationRequest;
            console.log({body: inter.request.body});
            assert.equal(body.courseId, 'course1');
            // etc. etc.
          });


         // cy.url().should('match', /\/courses\/registrations$/);

        });

  });

  describe('the enrollment flow', () => {
    beforeEach(() => {
      // make up some crap.
      cy.intercept('POST', '/api/registrations', {
        statusCode: 201,
        body: {
          "registrationId": "registration1",
          "courseId": "course1",
          "courseName": "Country Line Dancing",
          "dateOfCourse": "2022-06-07T00:00:00",
          "user": "Sue",
          "status": "PENDING"
      }
      })
    })

    it('shows them the enrollment', () => {
      cy.get('[data-enrollment-date-list]').select(fixtureData[0].startDate);
      cy.get('button[type="submit"]').click();


      cy.url().should('match', /\/courses\/registrations$/);

    });
  })

  describe('accessibility', () => {

    it('check for accessibility', () => {
      cy.checkForDetectableAccessibilityIssues();
    })
  });
});


