import { useState, useMemo } from 'react'; // <-- 1. ПРАВИЛЬНИЙ ІМПОРТ ХУКІВ
import styles from './HomePage.module.css'; // <-- 2. ПРАВИЛЬНИЙ ШЛЯХ
import BrandCard from '../components/BrandCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const HomePage = () => {
  const { data: brands, loading, error } = useFetch('/brands');
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');

  const filteredBrands = useMemo(() => {
    if (!brands) return [];

    return brands.filter((brand) => {
      const nameMatch = brand.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const countryValue = selectedCountry;
      const countryMatch =
        countryValue === 'All Countries' || brand.country === countryValue;

      return nameMatch && countryMatch;
    });
  }, [brands, searchTerm, selectedCountry]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleBrandClick = (brandId) => {
    navigate(`/brands/${brandId}`);
  };

  return (
    <div className={styles.homePage}>
      <Header />
      <main>
        <SearchBar
          searchPlaceholder="Search car brands..."
          filterOptions={['All Countries', 'Germany', 'USA', 'Japan', 'Italy']}
          showFilter={true}
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
          filterValue={selectedCountry}
          onFilterChange={handleCountryChange}
        />

        {loading && (
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
            Завантаження брендів...
          </p>
        )}
        {error && (
          <p style={{ color: 'red', textAlign: 'center' }}>Помилка: {error}</p>
        )}

        {!loading && !error && (
          <div className={styles.brandGrid}>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  id={brand.id}
                  logoUrl={brand.logoUrl}
                  name={brand.name}
                  country={brand.country}
                  onClick={() => handleBrandClick(brand.id)}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>Бренди не знайдено.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
export default HomePage;
