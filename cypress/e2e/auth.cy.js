describe('Авторизація та захищені маршрути', () => {
  beforeEach(() => {
    cy.intercept('POST', '**login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        accessToken: 'fake-jwt-token',
        user: {
          id: 1,
          _id: 1,
          name: 'E2E User',
          email: 'test@test.com',
          role: 'user',
        },
      },
    }).as('loginRequest');
  });

  it('дозволяє увійти в систему і побачити профіль', () => {
    cy.visit('/auth');

    cy.get('input[name="loginEmail"]').type('test@test.com');
    cy.get('input[name="loginPassword"]').type('password123{enter}');

    cy.wait('@loginRequest');

    cy.contains('Profile').should('be.visible');

    cy.contains('Profile').click();

    cy.url().should('include', '/profile');
    cy.contains('Секретний Профіль').should('be.visible');
  });

  it('не пускає неавторизованого користувача в профіль (Redirect)', () => {
    cy.visit('/profile');

    cy.url().should('include', '/auth');
    cy.contains('Sign in / up').should('be.visible');
  });

  it('працює вихід із системи (Logout)', () => {
    cy.visit('/auth');
    cy.get('input[name="loginEmail"]').type('test@test.com');
    cy.get('input[name="loginPassword"]').type('password123{enter}');
    cy.wait('@loginRequest');

    cy.contains('Profile').should('be.visible');

    cy.contains('button', 'Logout').click();

    cy.contains('Sign in / up').should('be.visible');
    cy.contains('Profile').should('not.exist');
  });
});
