describe('Реєстрація нового користувача', () => {
  beforeEach(() => {
    cy.intercept('POST', '**register', {
      statusCode: 201,
      body: {
        token: 'new-user-token',
        accessToken: 'new-user-token',
        user: {
          id: 2,
          _id: 2,
          name: 'New User',
          email: 'new@test.com',
          role: 'user',
        },
      },
    }).as('registerRequest');
  });

  it('показує попередження (alert), якщо паролі не співпадають', () => {
    cy.visit('/auth');

    cy.get('input[name="registerEmail"]').type('mismatch@test.com');
    cy.get('input[name="registerPassword"]').type('pass123');
    cy.get('input[name="confirmPassword"]').type('pass000');

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.contains('button', 'Sign Up').click();

    cy.then(() => {
      expect(alertStub).to.be.calledWith('Паролі не співпадають!');
    });
  });

  it('успішно реєструє користувача при правильних даних', () => {
    cy.visit('/auth');

    cy.get('input[name="registerEmail"]').type('new@test.com');
    cy.get('input[name="registerPassword"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');

    cy.on('window:alert', () => true);

    cy.contains('button', 'Sign Up').click();

    cy.wait('@registerRequest');

    cy.contains('Profile').should('be.visible');
  });
});
