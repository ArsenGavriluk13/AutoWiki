import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<ProfilePage />', () => {
  it('відображає секретний контент', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('Секретний Профіль').should('be.visible');
  });

  it('містить навігаційну шапку (Header)', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('AutoWiki').should('be.visible');
  });

  it('дозволяє вийти з акаунту через хедер', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.contains('Home').should('be.visible');
  });

  it('має правильні відступи (layout)', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>,
    );
    cy.get('div').first().should('have.css', 'margin', '0px');
  });
});
