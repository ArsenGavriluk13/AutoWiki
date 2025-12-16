import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const SecretPage = () => <h1>Secret Data</h1>;
const AuthPage = () => <h1>Auth Page</h1>;

describe('<ProtectedRoute />', () => {
  const mountProtected = (isLoggedIn) => {
    cy.mount(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <MemoryRouter initialEntries={['/secret']}>
          <Routes>
            <Route
              path="/secret"
              element={
                <ProtectedRoute>
                  <SecretPage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
  };

  it('дозволяє доступ авторизованому користувачу', () => {
    mountProtected(true);
    cy.contains('Secret Data').should('be.visible');
    cy.contains('Auth Page').should('not.exist');
  });

  it('перенаправляє гостя на сторінку входу', () => {
    mountProtected(false);
    cy.contains('Secret Data').should('not.exist');
    cy.contains('Auth Page').should('be.visible');
  });
});
