import { useState } from 'react';
import styles from './AuthPage.module.css';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login, register, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    if (registerPassword !== confirmPassword) {
      alert('Паролі не співпадають!');
      return;
    }
    await register(registerEmail, registerPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(loginEmail, loginPassword);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.backButtonContainer}>
        <Button onClick={handleGoBack} className={styles.backButton}>
          &lt;- Back to brands
        </Button>
      </div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Sign in / up</h1>

        {error && (
          <p
            style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}
          >
            {error}
          </p>
        )}
        <div className={styles.formsContainer}>
          <form className={styles.form} onSubmit={handleRegister}>
            <h2 className={styles.formTitle}>Registration</h2>
            <InputField
              id="reg-email"
              type="email"
              placeholder="Email"
              name="registerEmail"
              required
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <InputField
              id="reg-password"
              type="password"
              placeholder="Password"
              name="registerPassword"
              required
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <InputField
              id="reg-confirm"
              type="password"
              placeholder="Repeat Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              className={styles.formButton}
              disabled={loading}
            >
              {loading ? 'Реєстрація...' : 'Sign Up'}
            </Button>
          </form>

          <div className={styles.divider}>Or</div>

          <form className={styles.form} onSubmit={handleLogin}>
            <h2 className={styles.formTitle}>Login</h2>
            <InputField
              id="login-email"
              type="email"
              placeholder="Email"
              name="loginEmail"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <InputField
              id="login-password"
              type="password"
              placeholder="Password"
              name="loginPassword"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              type="submit"
              className={styles.formButton}
              disabled={loading}
            >
              {loading ? 'Вхід...' : 'Sign In'}
            </Button>
            <button
              type="button"
              className={styles.forgotPasswordButton}
              disabled={loading}
            >
              Forgot password?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
