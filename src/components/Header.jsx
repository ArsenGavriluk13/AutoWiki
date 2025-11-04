import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            AutoWiki
          </a>
        </div>
        <nav className={styles.navigation}>
          <Link to="/auth">Sign in / up</Link>
          <Link to="/">Home</Link>
        </nav>
      </header>
    </div>
  );
};
export default Header;
