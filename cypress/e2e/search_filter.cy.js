describe('Розширений пошук та фільтрація', () => {
  beforeEach(() => {
    const brands = [
      { id: 1, name: 'BMW', country: 'Germany' },
      { id: 2, name: 'Audi', country: 'Germany' },
      { id: 3, name: 'Toyota', country: 'Japan' },
      { id: 4, name: 'Ford', country: 'USA' },
    ];

    cy.intercept('GET', '**/brands', {
      statusCode: 200,
      body: brands,
    }).as('getBrands');

    cy.visit('/');
    cy.wait('@getBrands');
  });

  it('фільтрує бренди за країною', () => {
    cy.get('select').select('Germany');

    cy.contains('BMW').should('be.visible');
    cy.contains('Audi').should('be.visible');

    cy.contains('Toyota').should('not.exist');
    cy.contains('Ford').should('not.exist');
  });

  it('комбінує пошук і фільтр (Search + Select)', () => {
    cy.get('select').select('Germany');

    cy.get('input[placeholder="Search car brands..."]').type('Au');

    cy.contains('Audi').should('be.visible');
    cy.contains('BMW').should('not.exist');
  });

  it('показує повідомлення, якщо нічого не знайдено', () => {
    cy.get('input[placeholder="Search car brands..."]').type('Tesla');

    cy.contains('Бренди не знайдено.').should('be.visible');

    cy.get('div[class*="brandCard"]').should('not.exist');
  });
});
