import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            AutoWiki
          </Link>
        </div>
        <nav className={styles.navigation}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className={styles.navLink}>
                Profile
              </Link>
              <button onClick={logout} className={styles.navButton}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className={styles.navLink}>
              Sign in / up
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};
export default Header;
