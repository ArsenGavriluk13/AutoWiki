import { Routes, Route, MemoryRouter } from 'react-router-dom';
import ModelPage from './ModelPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<ModelPage />', () => {
  const brandId = '1';
  const modelId = '101';

  const mountPage = () => {
    cy.mount(
      <MemoryRouter initialEntries={[`/brands/${brandId}/models/${modelId}`]}>
        <AuthProvider>
          <Routes>
            <Route
              path="/brands/:brandId/models/:modelId"
              element={<ModelPage />}
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
  };

  it('успішно відображає деталі', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    }).as('getBrand');
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: {
        id: 101,
        modelName: 'X5',
        year: 2023,
        facts: [],
        imageUrl: 'x5.jpg',
        description: 'Desc',
      },
    }).as('getModel');

    mountPage();
    cy.wait(['@getBrand', '@getModel']);
    cy.contains('BMW X5').should('be.visible');
  });

  it('обробляє критичну помилку завантаження (500)', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      statusCode: 500,
      body: {},
    }).as('getModelFail');

    mountPage();
    cy.wait('@getModelFail');

    cy.contains('Помилка: Не вдалося завантажити дані моделі').should(
      'be.visible',
    );
    cy.contains('Back to models').should('be.visible');
  });

  it('рендерить правильну кількість фактів', () => {
    const facts = ['Fact 1', 'Fact 2', 'Fact 3'];
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: { id: 101, modelName: 'M5', facts: facts, imageUrl: 'img.jpg' },
    }).as('getFacts');

    mountPage();
    cy.wait('@getFacts');

    cy.get('ul li').should('have.length', 3);
    cy.contains('Fact 2').should('be.visible');
  });

  it('має кнопку повернення до списку моделей', () => {
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: { id: 101, facts: [], imageUrl: '', modelName: 'Test' },
    }).as('getSimple');

    mountPage();
    cy.wait('@getSimple');

    cy.contains('button', 'Back to models').should('be.visible').click();
  });

  it('відображає секцію опису', () => {
    const desc = 'This is a very long description of the car.';
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: {
        id: 101,
        description: desc,
        facts: [],
        imageUrl: '',
        modelName: 'Test',
      },
    }).as('getDesc');

    mountPage();
    cy.wait('@getDesc');

    cy.contains('h2', 'Опис').should('be.visible');
    cy.contains(desc).should('be.visible');
  });

  it('обробляє помилку завантаження зображення', () => {
    cy.on('uncaught:exception', () => false);
    cy.intercept('GET', `**/brands/${brandId}`, {
      body: { id: 1, name: 'BMW' },
    });
    cy.intercept('GET', `**/modelDetails/${modelId}`, {
      body: { id: 101, modelName: 'X5', imageUrl: 'bad.jpg', facts: [] },
    }).as('getData');

    mountPage();
    cy.wait('@getData');

    cy.get('img').trigger('error', { force: true });
    cy.get('img').should('have.attr', 'src', '/images/placeholder.png');
  });
});
