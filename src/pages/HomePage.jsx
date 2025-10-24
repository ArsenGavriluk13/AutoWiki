import styles from './HomePage.module.css';
import BrandCard from '../components/BrandCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const MOCK_BRANDS = [
  { id: 'audi', name: 'Audi', country: 'Germany', logoUrl: '/logos/audi.png' },
  { id: 'bmw', name: 'BMW', country: 'Germany', logoUrl: '/logos/bmw.png' },
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italy',
    logoUrl: '/logos/ferrari.png',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Germany',
    logoUrl: '/logos/porsche.png',
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    country: 'Germany',
    logoUrl: '/logos/mercedes.png',
  },
  { id: 'ford', name: 'Ford', country: 'USA', logoUrl: '/logos/ford.png' },
  { id: 'mazda', name: 'Mazda', country: 'Japan', logoUrl: '/logos/mazda.png' },
  {
    id: 'pagani',
    name: 'Pagani',
    country: 'Italy',
    logoUrl: '/logos/pagani.png',
  },
];

const HomePage = () => {
  const handleBrandClick = (brandName) => {
    console.log(`Maps to ${brandName} page`);
  };

  return (
    <div className={styles.homePage}>
      <Header />
      <main>
        <SearchBar
          searchPlaceholder="Search car brands..."
          filterOptions={['All Countries', 'Germany', 'USA', 'Japan', 'Italy']}
          showFilter={true}
        />
        <div className={styles.brandGrid}>
          {MOCK_BRANDS.map((brand) => (
            <BrandCard
              key={brand.id}
              {...brand}
              onClick={() => handleBrandClick(brand.name)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
export default HomePage;
