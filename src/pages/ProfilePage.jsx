import Header from '../components/Header';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div style={{ padding: '15px 15px', maxWidth: 'auto', margin: '0 auto' }}>
      <Header />
      <main style={{ padding: '40px 550px' }}>
        <h1 style={{ color: 'lime', marginBottom: '20px' }}>
          Секретний Профіль
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
