import styles from './BrandCard.module.css';
import { useNavigate } from 'react-router-dom';

const BrandCard = ({ id, logoUrl, name, country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brands/${id}`);
  };
  return (
    <div className={styles.brandCard} onClick={handleClick}>
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
