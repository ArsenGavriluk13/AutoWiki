describe('Індикація завантаження (Loading States)', () => {
  it('показує спінер/текст завантаження поки дані йдуть', () => {
    cy.intercept('GET', '**/brands', {
      delay: 2000,
      body: [{ id: 1, name: 'Slow BMW', country: 'Germany' }],
    }).as('getSlowBrands');

    cy.visit('/');

    cy.contains('Завантаження брендів...').should('be.visible');
    cy.contains('Slow BMW').should('not.exist');

    cy.wait('@getSlowBrands', { timeout: 5000 });

    cy.contains('Завантаження брендів...').should('not.exist');
    cy.contains('Slow BMW').should('be.visible');
  });
});
