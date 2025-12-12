import { MemoryRouter } from 'react-router-dom';
import Header from './Header.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

describe('<Header />', () => {
  const mountHeader = (isLoggedIn) => {
    const logoutSpy = cy.spy().as('logout');

    cy.mount(
      <AuthContext.Provider value={{ isLoggedIn, logout: logoutSpy }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
  };

  it('показує Sign in для гостя', () => {
    mountHeader(false);
    cy.contains('Sign in / up').should('be.visible');
  });

  it('показує Profile для юзера', () => {
    mountHeader(true);
    cy.contains('Profile').should('be.visible');
  });
});
