import { useState, useMemo } from 'react'; // <-- 1. ПРАВИЛЬНИЙ ІМПОРТ ХУКІВ
import styles from './BrandPage.module.css'; // <-- 2. ПРАВИЛЬНИЙ ШЛЯХ
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import ModelCard from '../components/ModelCard';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const BrandPage = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();

  const { data: brandInfo, loading: brandLoading } = useFetch(
    `/brands/${brandId}`,
  );
  const {
    data: models,
    loading: modelsLoading,
    error: modelsError,
  } = useFetch(`/models?brandId=${brandId}`);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const filteredModels = useMemo(() => {
    if (!models) return [];

    return models.filter((model) => {
      const nameMatch = model.modelName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const yearMatch =
        selectedYear === 'All Years' || model.year.toString() === selectedYear;
      return nameMatch && yearMatch;
    });
  }, [models, searchTerm, selectedYear]);

  const handleGoBack = () => navigate(-1);
  const handleModelClick = (modelId) => {
    navigate(`/brands/${brandId}/models/${modelId}`);
  };

  if (brandLoading || modelsLoading) {
    return (
      <div className={styles.brandPage}>
        <Header />
        <main>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
            Завантаження сторінки бренду...
          </p>
        </main>
      </div>
    );
  }

  if (!brandInfo) {
    return (
      <div className={styles.brandPage}>
        <Header />
        <main>
          <p style={{ color: 'red', textAlign: 'center' }}>
            Помилка: Бренд не знайдено.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.brandPage}>
      <Header />
      <main>
        <div className={styles.topSection}>
          <Button onClick={handleGoBack}>&lt;- Back to brands</Button>
          {brandInfo.logoUrl && (
            <img
              src={brandInfo.logoUrl}
              alt={`${brandInfo.name} logo`}
              className={styles.brandLogo}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>

        <h2 className={styles.pageTitle}>{brandInfo.name}&apos;s models</h2>

        <div className={styles.searchContainer}>
          <SearchBar
            searchPlaceholder="Search car models..."
            showFilter={false}
            className={styles.modelSearchInput}
            searchValue={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="year-filter" className={styles.visuallyHidden}>
            Filter by year:
          </label>
          <select
            className={styles.yearFilter}
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>

        {modelsError && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            Помилка завантаження моделей: {modelsError}
          </p>
        )}

        <div className={styles.modelGrid}>
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <ModelCard
                key={model.id}
                brandId={brandId}
                modelId={model.id}
                brandName={brandInfo.name}
                modelName={model.modelName}
                onClick={() => handleModelClick(model.id)}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>Моделі не знайдено.</p>
          )}
        </div>
      </main>
    </div>
  );
};
export default BrandPage;
