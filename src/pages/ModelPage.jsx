import styles from './ModelPage.module.css';
import Header from '../components/Header';
import Button from '../components/Button';
import { useParams, useNavigate } from 'react-router-dom';

const MODEL_DATA = {
  year: '2023',
  description: 'Audi A4 – це популярний середньорозмірний седан...',
  imageUrl: '/images/audi-a4.jpg',
  facts: [
    "Об'єм двигуна: від 1.4 до 3.0 літра",
    'Доступні комплектації: Base, Premium, S line',
    'Потужність: від 150 до 347 к.с.',
  ],
};

const ModelPage = () => {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const displayBrandName = brandId
    ? brandId.charAt(0).toUpperCase() + brandId.slice(1)
    : '';
  const displayModelName = modelId ? modelId.toUpperCase() : '';

  return (
    <div className={styles.modelPage}>
      <Header />
      <main className={styles.mainContent}>
        <Button onClick={handleGoBack} className={styles.backButton}>
          &lt;- Назад до моделей
        </Button>
        <div className={styles.contentGrid}>
          <div className={styles.infoColumn}>
            <h1 className={styles.modelTitle}>
              {displayBrandName} {displayModelName}
            </h1>
            <p className={styles.modelMeta}>
              {displayBrandName}, {MODEL_DATA.year}
            </p>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Опис</h2>
              <p className={styles.description}>{MODEL_DATA.description}</p>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Цікаві факти</h2>
              <ul className={styles.factsList}>
                {MODEL_DATA.facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className={styles.imageColumn}>
            <img
              src={MODEL_DATA.imageUrl}
              alt={`${displayBrandName} ${displayModelName}`}
              className={styles.modelImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.png';
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ModelPage;
