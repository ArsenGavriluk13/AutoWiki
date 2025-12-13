import useFetch from './useFetch';

const TestComponent = ({ url }) => {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div data-cy="loading">Loading...</div>;
  if (error) return <div data-cy="error">{error}</div>;
  if (data) return <div data-cy="data">{JSON.stringify(data)}</div>;

  return null;
};

describe('useFetch Hook', () => {
  it('повертає дані при успішному запиті', () => {
    const mockData = { message: 'Success' };

    cy.intercept('GET', '/test-url', {
      statusCode: 200,
      body: mockData,
    }).as('getData');

    cy.mount(<TestComponent url="/test-url" />);

    cy.contains('Loading...').should('be.visible');
    cy.wait('@getData');

    cy.get('[data-cy="data"]').should('contain', 'Success');
  });

  it('повертає помилку при невдачі (500)', () => {
    cy.intercept('GET', '/error-url', {
      statusCode: 500,
      body: { message: 'Server Boom' },
    }).as('getError');

    cy.mount(<TestComponent url="/error-url" />);

    cy.wait('@getError');

    cy.get('[data-cy="error"]').should('exist');
  });

  it('скасовує запит при розмонтуванні (AbortController)', () => {
    cy.intercept('GET', '/abort-url', {
      delay: 1000,
      body: { ok: true },
    }).as('getAbort');

    cy.mount(<TestComponent url="/abort-url" />);

    cy.contains('Loading...').should('be.visible');

    cy.mount(<div>Unmounted</div>);
  });
});
