describe('Навігація користувача (User Journey)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/brands', {
      statusCode: 200,
      body: [
        { id: 1, name: 'BMW', country: 'Germany', logoUrl: 'bmw.png' },
        { id: 2, name: 'Toyota', country: 'Japan', logoUrl: 'toyota.png' },
      ],
    }).as('getBrands');

    cy.intercept('GET', '**/brands/1', {
      statusCode: 200,
      body: { id: 1, name: 'BMW', country: 'Germany', logoUrl: 'bmw.png' },
    }).as('getBrandBMW');

    cy.intercept('GET', '**/models?brandId=1', {
      statusCode: 200,
      body: [{ id: 101, modelName: 'M5', year: 2023, imageUrl: 'm5.jpg' }],
    }).as('getModelsBMW');

    cy.intercept('GET', '**/modelDetails/101', {
      statusCode: 200,
      body: {
        id: 101,
        modelName: 'M5',
        year: 2023,
        facts: ['Fast car'],
        imageUrl: 'm5.jpg',
        description: 'Super sedan',
      },
    }).as('getModelM5');
  });

  it('проходить повний шлях: Головна -> Бренд -> Модель -> Назад', () => {
    cy.visit('/');
    cy.wait('@getBrands');

    cy.get('input[placeholder="Search car brands..."]').type('BM');
    cy.contains('Toyota').should('not.exist');
    cy.contains('BMW').should('be.visible');

    cy.contains('BMW').click();

    cy.url().should('include', '/brands/1');
    cy.wait(['@getBrandBMW', '@getModelsBMW']);
    cy.contains("BMW's models").should('be.visible');

    cy.contains('M5').click();

    cy.url().should('include', '/brands/1/models/101');
    cy.wait('@getModelM5');
    cy.contains('Super sedan').should('be.visible');

    cy.contains('button', 'Back to models').click();
    cy.url().should('include', '/brands/1');

    cy.contains('button', 'Back to brands').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('обробляє перехід на неіснуючу сторінку (404)', () => {
    cy.visit('/blablabla');
    cy.contains('404').should('be.visible');
    cy.contains('Сторінку не знайдено').should('be.visible');

    cy.contains('Повернутись на головну').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
