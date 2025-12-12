import { MemoryRouter } from 'react-router-dom';
import AuthPage from './AuthPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('<AuthPage />', () => {
  const mountAuth = () => {
    cy.mount(
      <MemoryRouter>
        <AuthProvider>
          <AuthPage />
        </AuthProvider>
      </MemoryRouter>,
    );
  };

  it('успішний вхід користувача', () => {
    cy.intercept('POST', '**login', {
      statusCode: 200,
      body: { token: 'fake-jwt', user: { name: 'Test User' } },
    }).as('loginReq');

    mountAuth();

    cy.get('input[name="loginEmail"]').type('test@test.com');
    cy.get('input[name="loginPassword"]').type('password123');
    cy.contains('button', 'Sign In').click();

    cy.wait('@loginReq');
  });

  it('показує помилку при неправильних даних (401)', () => {
    cy.intercept('POST', '**login', {
      statusCode: 401,
      body: {
        message: 'Невірний логін або пароль',
        error: 'Невірний логін або пароль',
      },
    }).as('loginFail');

    mountAuth();

    cy.get('input[name="loginEmail"]').type('wrong@test.com');
    cy.get('input[name="loginPassword"]').type('wrongpass');
    cy.contains('button', 'Sign In').click();

    cy.wait('@loginFail');

    cy.get('p').should('have.css', 'color', 'rgb(255, 0, 0)').and('be.visible');
  });

  it('відображає кнопку відновлення пароля', () => {
    mountAuth();
    cy.contains('button', 'Forgot password?')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('не відправляє форму, якщо поля пусті (HTML5 validation)', () => {
    mountAuth();

    cy.contains('button', 'Sign In').click();

    cy.get('input[name="loginEmail"]').should('match', ':invalid');
  });

  it('має працюючу кнопку повернення назад', () => {
    mountAuth();

    cy.contains('Back to brands').should('be.visible').click();
  });

  it('перевіряє співпадіння паролів при реєстрації', () => {
    mountAuth();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input[name="registerEmail"]').type('new@user.com');
    cy.get('input[name="registerPassword"]').type('pass123');
    cy.get('input[name="confirmPassword"]').type('pass000');

    cy.contains('button', 'Sign Up')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Паролі не співпадають!');
      });
  });
});
