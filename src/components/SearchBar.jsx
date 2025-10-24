import styles from './SearchBar.module.css';
import InputField from './InputField';

const SearchBar = ({
  searchPlaceholder = 'Search...',
  filterOptions = [],
  showFilter = true,
  className = '',
}) => {
  const containerClasses = `${styles.searchBarContainer} ${className}`;
  return (
    <div className={containerClasses}>
      <label htmlFor="search-input" className={styles.visuallyHidden}>
        {searchPlaceholder}
      </label>
      <InputField
        id="search-input"
        type="text"
        placeholder={searchPlaceholder}
        className={styles.searchInput}
      />
      {showFilter && filterOptions.length > 0 && (
        <>
          <label htmlFor="filter-select" className={styles.visuallyHidden}>
            Filter:
          </label>
          <select id="filter-select" className={styles.filterSelect}>
            {filterOptions.map((option, index) => (
              <option
                key={index}
                value={option.toLowerCase().replace(/\s+/g, '-')}
              >
                {option}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
export default SearchBar;
