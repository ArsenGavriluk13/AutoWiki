import styles from './BrandPage.module.css';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import ModelCard from '../components/ModelCard';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { brandId } = useParams();
  const brandName = brandId
    ? brandId.charAt(0).toUpperCase() + brandId.slice(1)
    : 'Unknown Brand';
  const brandLogoUrl = brandId ? `/logos/${brandId}.png` : null;
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.brandPage}>
      <Header />
      <main>
        <div className={styles.topSection}>
          <Button onClick={handleGoBack}>&lt;- Back to brands</Button>
          {brandLogoUrl && (
            <img
              src={brandLogoUrl}
              alt={`${brandName} logo`}
              className={styles.brandLogo}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>

        <h2 className={styles.pageTitle}>{brandName}&apos;s models</h2>

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
              brandId={brandId}
              modelId={model.id}
              brandName={brandName}
              modelName={model.modelName}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrandPage;
