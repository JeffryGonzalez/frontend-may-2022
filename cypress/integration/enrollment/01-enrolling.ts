const fixtureData = [
  { startDate: '2022-06-07T00:00:00', endDate: '2022-06-10T00:00:00', display: 'Jun 7, 2022 - Jun 10, 2022 (4 days)' },
  { startDate: '2022-08-01T00:00:00', endDate: '2022-08-04T00:00:00', display: 'Aug 1, 2022 - Aug 4, 2022 (3 days)' },
];

describe('enrolling for a course', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      fixture: 'enrollment/courses.json',
    });
    cy.intercept('/api/scheduling/schedule', {
      fixture: 'enrollment/schedule.json',
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
        );
      }
    );
  });
});

