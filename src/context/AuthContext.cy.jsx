import { useAuthContext, AuthProvider } from './AuthContext';

const TestComponent = () => {
  useAuthContext();
  return <div>I shouldn&apos;t be here</div>;
};

describe('AuthContext', () => {
  it('надає дані через провайдер', () => {
    cy.mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
  });

  it('викидає помилку, якщо використовується поза AuthProvider', () => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('must be used within an AuthProvider')) {
        return false;
      }
      return true;
    });

    cy.mount(<TestComponent />);
  });
});
