// src/pages/ProfilePage.jsx

// Цей компонент не потребує 'React' у нових версіях
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    // Використаємо стилі з HomePage для загального контейнера
    <div style={{ padding: '0 15px', maxWidth: '1200px', margin: '0 auto' }}>
      <Header />
      <main style={{ padding: '40px 0' }}>
        <h1 style={{ color: 'lime', marginBottom: '20px' }}>
          🔒 Секретний Профіль 🔒
        </h1>
        <p>Цю сторінку бачать лише авторизовані користувачі.</p>
        <br />
        <Link to="/" style={{ color: 'red' }}>
          На головну
        </Link>
      </main>
    </div>
  );
};

export default ProfilePage;
