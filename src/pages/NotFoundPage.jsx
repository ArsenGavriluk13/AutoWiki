import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Сторінку не знайдено</p>
          <p className={styles.message}>
            Схоже, ви натрапили на посилання, якого не існує, або сторінку було
            видалено.
          </p>
          <Link to="/" className={styles.homeButton}>
            Повернутись на головну
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
