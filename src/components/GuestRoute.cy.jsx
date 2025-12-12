import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GuestRoute from './GuestRoute.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Login = () => <h1>Login Page (Public)</h1>;

describe('<GuestRoute />', () => {
  const mountGuest = (isLoggedIn) => {
    cy.mount(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
  };

  it('дозволяє доступ неавторизованому користувачу (Guest)', () => {
    mountGuest(false);
    cy.contains('Login Page').should('be.visible');
    cy.contains('Dashboard').should('not.exist');
  });

  it('перенаправляє авторизованого користувача на головну', () => {
    mountGuest(true);
    cy.contains('Login Page').should('not.exist');
    cy.contains('Dashboard').should('be.visible');
  });
});
