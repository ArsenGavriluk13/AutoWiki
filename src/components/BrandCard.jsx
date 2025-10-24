import styles from './BrandCard.module.css';

const BrandCard = ({ logoUrl, name, country, onClick }) => {
  return (
    <div className={styles.brandCard} onClick={onClick}>
      <div className={styles.logoWrapper}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className={styles.brandLogo}
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = e.target.nextElementSibling;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={styles.logoPlaceholder}
          style={logoUrl ? { display: 'none' } : { display: 'flex' }}
        >
          {name.substring(0, 1)}
        </div>
      </div>
      <h3 className={styles.brandName}>{name}</h3>
      <p className={styles.brandCountry}>{country}</p>
    </div>
  );
};

export default BrandCard;
