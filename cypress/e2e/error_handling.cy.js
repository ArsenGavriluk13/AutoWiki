describe('Обробка помилок API (Resilience)', () => {
  it('коректно відображає помилку при переході на бренд, якщо сервер впав', () => {
    cy.intercept('GET', '**/brands', {
      body: [{ id: 1, name: 'BMW', country: 'Germany' }],
    }).as('getBrands');

    cy.intercept('GET', '**/models?brandId=1', {
      statusCode: 500,
      body: { message: 'Database Connection Error' },
    }).as('getModelsFail');

    cy.intercept('GET', '**/brands/1', {
      body: { id: 1, name: 'BMW' },
    });

    cy.visit('/');
    cy.wait('@getBrands');

    cy.contains('BMW').click();

    cy.wait('@getModelsFail');

    cy.contains("BMW's models").should('be.visible');

    cy.contains(/Помилка|Error|Failed/i).should('be.visible');

    cy.contains('Back to brands').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
