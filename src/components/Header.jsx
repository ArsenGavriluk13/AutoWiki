import styles from './Header.module.css';

const Header = () => {
  const NavLink = ({ to, children }) => (
    <a href={to} className={styles.navLink}>
      {' '}
      {children}{' '}
    </a>
  );

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            AutoWiki
          </a>
        </div>
        <nav className={styles.navigation}>
          <NavLink to="/auth">Sign in / up</NavLink>
          <NavLink to="/">Home</NavLink>
        </nav>
      </header>
    </div>
  );
};
export default Header;
