describe('Мобільна версія (Responsive Design)', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');

    cy.intercept('GET', '**/brands', {
      body: [
        { id: 1, name: 'BMW', country: 'Germany' },
        { id: 2, name: 'Audi', country: 'Germany' },
      ],
    }).as('getBrands');

    cy.visit('/');
    cy.wait('@getBrands');
  });

  it('відображає елементи коректно на вузькому екрані', () => {
    cy.contains('AutoWiki').should('be.visible');
    cy.get('input[placeholder="Search car brands..."]').should('be.visible');

    cy.contains('BMW').scrollIntoView().should('be.visible').click();

    cy.url().should('include', '/brands/1');
  });

  it('бургер-меню або навігація доступні (якщо є)', () => {
    cy.get('header').should('have.css', 'width').and('not.eq', '0px');

    cy.contains('Sign in / up').should('be.visible');
  });
});
