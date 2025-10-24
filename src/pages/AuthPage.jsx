import styles from './AuthPage.module.css';
import InputField from '../components/InputField';
import Button from '../components/Button';

const AuthPage = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Register');
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login');
  };
  const handleGoBack = () => {
    console.log('Go back to brands');
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

        <div className={styles.splitLayout}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleRegister}>
              <h2 className={styles.formTitle}>Registration</h2>
              <InputField
                id="reg-email"
                type="email"
                placeholder="Email"
                name="registerEmail"
                required
              />
              <InputField
                id="reg-password"
                type="password"
                placeholder="Password"
                name="registerPassword"
                required
              />
              <InputField
                id="reg-confirm"
                type="password"
                placeholder="Repeat Password"
                name="confirmPassword"
                required
              />
              <Button type="submit" className={styles.formButton}>
                Sign Up
              </Button>
            </form>
          </div>

          <div className={styles.divider}>Or</div>

          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleLogin}>
              <h2 className={styles.formTitle}>Login</h2>
              <InputField
                id="login-email"
                type="email"
                placeholder="Email"
                name="loginEmail"
                required
              />
              <InputField
                id="login-password"
                type="password"
                placeholder="Password"
                name="loginPassword"
                required
              />
              <Button type="submit" className={styles.formButton}>
                Sign In
              </Button>
              <button type="button" className={styles.forgotPasswordButton}>
                Forgot password?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
