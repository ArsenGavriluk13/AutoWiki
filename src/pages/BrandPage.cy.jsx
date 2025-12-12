import { Routes, Route, MemoryRouter } from 'react-router-dom';
import BrandPage from './BrandPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<BrandPage />', () => {
  const brandId = '1';

  const mountPage = () => {
    cy.mount(
      <MemoryRouter initialEntries={[`/brands/${brandId}`]}>
        <AuthProvider>
          <Routes>
            <Route path="/brands/:brandId" element={<BrandPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
  };

  it('успішно відображає сторінку', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'Audi' },
    }).as('getBrand');
    cy.intercept('GET', `**/models?brandId=${brandId}`, {
      body: [{ id: 10, modelName: 'A8', year: 2022 }],
    }).as('getModels');

    mountPage();
    cy.wait(['@getBrand', '@getModels']);
    cy.contains('Audi').should('be.visible');
    cy.contains('A8').should('be.visible');
  });

  it('містить кнопку повернення до списку брендів', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'Audi' },
    });
    cy.intercept('GET', `**/models?brandId=${brandId}`, { body: [] });

    mountPage();

    cy.contains('button', 'Back to brands').should('be.visible').click();
  });

  it('фільтрує моделі за роком випуску', () => {
    const models = [
      { id: 1, modelName: 'M3', year: 2022 },
      { id: 2, modelName: 'M5', year: 2023 },
    ];
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/models?brandId=${brandId}`, { body: models }).as(
      'getModelsYear',
    );

    mountPage();
    cy.wait('@getModelsYear');

    cy.get('select').select('2023');

    cy.contains('M5').should('be.visible');
    cy.contains('M3').should('not.exist');
  });

  it('дозволяє клікнути на картку моделі', () => {
    const models = [{ id: 101, modelName: 'X5', year: 2023 }];
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/models?brandId=${brandId}`, { body: models }).as(
      'getModelClick',
    );

    mountPage();
    cy.wait('@getModelClick');

    cy.contains('X5').click();
  });

  it('показує помилку, якщо бренд не знайдено (404)', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      statusCode: 404,
      body: null,
    }).as('getBrandFail');
    cy.intercept('GET', `**/models?brandId=${brandId}`, { body: [] });

    mountPage();
    cy.wait('@getBrandFail');

    cy.contains('Помилка: Бренд не знайдено').should('be.visible');
  });

  it('показує помилку завантаження моделей (Models Error)', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'Audi' },
    }).as('getBrand');
    cy.intercept('GET', `**/models?brandId=${brandId}`, {
      statusCode: 500,
      body: { message: 'DB Error' },
    }).as('getModelsFail');

    mountPage();
    cy.wait(['@getBrand', '@getModelsFail']);

    cy.contains("Audi's models").should('be.visible');
    cy.contains('Помилка завантаження моделей').should('be.visible');
  });
});
