import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<NotFoundPage />', () => {
  it('відображає 404', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('404').should('be.visible');
  });

  it('відображає хедер з логотипом', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('AutoWiki').should('be.visible');
  });

  it('містить пояснювальний текст', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('Схоже, ви натрапили на посилання').should('be.visible');
  });

  it('кнопка повернення має правильний клас стилів', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.get('a[href="/"]').should('exist');
  });
});
