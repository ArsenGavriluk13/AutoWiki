describe('Прямі посилання (Deep Linking)', () => {
  const brandId = '1';
  const modelId = '101';

  beforeEach(() => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW', logoUrl: 'bmw.png' },
    }).as('getBrand');

    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: {
        id: 101,
        modelName: 'X5',
        year: 2023,
        description: 'Deep link test',
        facts: [],
        imageUrl: 'x5.jpg',
      },
    }).as('getModel');
  });

  it('коректно завантажує сторінку моделі при прямому переході', () => {
    cy.visit(`/brands/${brandId}/models/${modelId}`);

    cy.wait(['@getBrand', '@getModel']);

    cy.contains('BMW X5').should('be.visible');
    cy.contains('Deep link test').should('be.visible');
  });

  it('кнопка "Back" коректно працює навіть при прямому переході', () => {
    cy.visit(`/brands/${brandId}/models/${modelId}`);
    cy.wait(['@getBrand', '@getModel']);

    cy.intercept('GET', `**/models?brandId=${brandId}`, {
      body: [{ id: 101, modelName: 'X5' }],
    }).as('getModelsList');

    cy.contains('button', 'Back to models').click();

    cy.url().should('include', `/brands/${brandId}`);
    cy.contains("BMW's models").should('be.visible');
  });
});
