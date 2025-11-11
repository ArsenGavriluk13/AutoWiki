import styles from './ModelPage.module.css'; // <-- ПРАВИЛЬНИЙ ШЛЯХ
import Header from '../components/Header';
import Button from '../components/Button';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const ModelPage = () => {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();

  const {
    data: modelDetails,
    loading: detailsLoading,
    error: detailsError,
  } = useFetch(`/modelDetails/${modelId}`);
  const { data: brandInfo, loading: brandLoading } = useFetch(
    `/brands/${brandId}`,
  );
  const handleGoBack = () => navigate(-1);

  if (detailsLoading || brandLoading) {
    return (
      <div className={styles.modelPage}>
        <Header />
        <main className={styles.mainContent}>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
            Завантаження моделі...
          </p>
        </main>
      </div>
    );
  }

  if (detailsError || !modelDetails || !brandInfo) {
    return (
      <div className={styles.modelPage}>
        <Header />
        <main className={styles.mainContent}>
          <Button onClick={handleGoBack} className={styles.backButton}>
            &lt;- Назад до моделей
          </Button>
          <p style={{ color: 'red', textAlign: 'center' }}>
            Помилка: Не вдалося завантажити дані моделі.
          </p>
        </main>
      </div>
    );
  }

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
              {brandInfo.name} {modelDetails.modelName || modelId}
            </h1>
            <p className={styles.modelMeta}>
              {brandInfo.name}, {modelDetails.year}
            </p>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Опис</h2>
              <p className={styles.description}>{modelDetails.description}</p>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Цікаві факти</h2>
              <ul className={styles.factsList}>
                {modelDetails.facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className={styles.imageColumn}>
            <img
              src={modelDetails.imageUrl}
              alt={`${brandInfo.name} ${modelDetails.modelName}`}
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
