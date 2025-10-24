import styles from './BrandPage.module.css';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import ModelCard from '../components/ModelCard';
import Header from '../components/Header';

const BRAND_INFO = { name: 'Audi', logoUrl: '/logos/audi.png' };
const MOCK_MODELS = [
  { id: 'a3', modelName: 'A3' },
  { id: 'a4', modelName: 'A4' },
  { id: 'a5', modelName: 'A5' },
  { id: 'a6', modelName: 'A6' },
  { id: 'a7', modelName: 'A7' },
  { id: 'a8', modelName: 'A8' },
  { id: 'q3', modelName: 'Q3' },
  { id: 'q5', modelName: 'Q5' },
  { id: 'q7', modelName: 'Q7' },
  { id: 'q8', modelName: 'Q8' },
  { id: 'r8', modelName: 'R8' },
  { id: 'tt', modelName: 'TT' },
  { id: '50', modelName: '50' },
  { id: '80', modelName: '80' },
  { id: '100', modelName: '100' },
  { id: '200', modelName: '200' },
];

const BrandPage = () => {
  const handleGoBack = () => console.log('Go back');
  const handleModelClick = (modelName) =>
    console.log(`Maps to ${BRAND_INFO.name} ${modelName}`);

  return (
    <div className={styles.brandPage}>
      <Header />
      <main>
        <div className={styles.topSection}>
          <Button onClick={handleGoBack}>&lt;- Back to brands</Button>
          {BRAND_INFO.logoUrl && (
            <img
              src={BRAND_INFO.logoUrl}
              alt={`${BRAND_INFO.name} logo`}
              className={styles.brandLogo}
            />
          )}
        </div>

        <h2 className={styles.pageTitle}>{BRAND_INFO.name}&apos;s models</h2>

        <div className={styles.searchContainer}>
          <SearchBar
            searchPlaceholder="Search car models..."
            showFilter={false}
            className={styles.modelSearchInput}
          />
          <label htmlFor="year-filter" className={styles.visuallyHidden}>
            Filter by year:
          </label>
          <select className={styles.yearFilter} id="year-filter">
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>

        <div className={styles.modelGrid}>
          {MOCK_MODELS.map((model) => (
            <ModelCard
              key={model.id}
              brandName={BRAND_INFO.name}
              modelName={model.modelName}
              onClick={() => handleModelClick(model.modelName)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrandPage;
