import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<HomePage />', () => {
  const mockBrands = [
    { id: 1, name: 'BMW', country: 'Germany', logoUrl: '' },
    { id: 2, name: 'Ford', country: 'USA', logoUrl: '' },
  ];

  const mountHome = () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </MemoryRouter>,
    );
  };

  it('успішно вантажить і показує бренди', () => {
    cy.intercept('GET', '**/brands', { statusCode: 200, body: mockBrands }).as(
      'getBrands',
    );
    mountHome();
    cy.wait('@getBrands');
    cy.contains('BMW').should('be.visible');
  });

  it('переходить на сторінку бренду при кліку на картку', () => {
    cy.intercept('GET', '**/brands', { body: mockBrands }).as('getBrands');

    mountHome();
    cy.wait('@getBrands');

    cy.contains('BMW').click();
  });

  it('фільтрує список по країні', () => {
    const brands = [
      { id: 1, name: 'BMW', country: 'Germany' },
      { id: 2, name: 'Ford', country: 'USA' },
    ];
    cy.intercept('GET', '**/brands', { body: brands }).as('getTwoBrands');

    mountHome();
    cy.wait('@getTwoBrands');

    cy.get('select').select('USA');

    cy.contains('Ford').should('be.visible');
    cy.contains('BMW').should('not.exist');
  });

  it('працює комбінація пошуку та фільтру країн', () => {
    const brands = [
      { id: 1, name: 'BMW', country: 'Germany' },
      { id: 2, name: 'Audi', country: 'Germany' },
      { id: 3, name: 'Ford', country: 'USA' },
    ];
    cy.intercept('GET', '**/brands', { body: brands }).as('getThreeBrands');

    mountHome();
    cy.wait('@getThreeBrands');

    cy.get('select').select('Germany');

    cy.get('input').type('Au');

    cy.contains('Audi').should('be.visible');
    cy.contains('BMW').should('not.exist');
    cy.contains('Ford').should('not.exist');
  });

  it('показує повідомлення, коли пошук не дав результатів', () => {
    cy.intercept('GET', '**/brands', { statusCode: 200, body: mockBrands }).as(
      'getBrands',
    );
    mountHome();
    cy.wait('@getBrands');

    cy.get('input[placeholder="Search car brands..."]').type('Zaporozhets');

    cy.contains('Бренди не знайдено.').should('be.visible');
    cy.contains('BMW').should('not.exist');
  });

  it('обробляє помилку сервера (500)', () => {
    cy.intercept('GET', '**/brands', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getError');

    mountHome();
    cy.wait('@getError');

    cy.contains('Помилка').should('be.visible');
  });
});
