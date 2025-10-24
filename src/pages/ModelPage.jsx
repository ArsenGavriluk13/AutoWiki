import styles from './ModelPage.module.css';
import Header from '../components/Header';
import Button from '../components/Button';

const MODEL_DATA = {
  brandName: 'Audi',
  modelName: 'A4',
  year: '2023',
  description:
    'Audi A4 – це популярний середньорозмірний седан, який є ідеальним вибором для тих, хто цінує комфорт, продуктивність. Модель має витончений дизайн, потужні двигуни та передові технології.',
  imageUrl: '/images/audi-a4.jpg',
  facts: [
    "Об'єм двигуна: від 1.4 до 3.0 літра",
    'Доступні комплектації: Base, Premium, S line',
    'Потужність: від 150 до 347 к.с.',
  ],
};

const ModelPage = () => {
  const handleGoBack = () => console.log('Go back to models');

  return (
    <div className={styles.modelPage}>
      <Header />
      <main className={styles.mainContent}>
        <Button onClick={handleGoBack} className={styles.backButton}>
          &lt;- Back to models
        </Button>
        <div className={styles.contentGrid}>
          <div className={styles.infoColumn}>
            <h1 className={styles.modelTitle}>
              {MODEL_DATA.brandName} {MODEL_DATA.modelName}
            </h1>
            <p className={styles.modelMeta}>
              {MODEL_DATA.brandName}, {MODEL_DATA.year}
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
              alt={`${MODEL_DATA.brandName} ${MODEL_DATA.modelName}`}
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
