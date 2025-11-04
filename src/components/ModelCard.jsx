import styles from './ModelCard.module.css';
import { useNavigate } from 'react-router-dom';

const ModelCard = ({ brandId, modelId, brandName, modelName }) => {
  const navigate = useNavigate();

  console.log('Rendering ModelCard:', {
    brandId,
    modelId,
    brandName,
    modelName,
  });

  const handleClick = () => {
    console.log('Navigating with:', { brandId, modelId });

    if (brandId && modelId) {
      const path = `/brands/${brandId}/models/${modelId}`;
      console.log('Navigating to path:', path);
      navigate(path);
    } else {
      console.error('Missing brandId or modelId for navigation!');
    }
  };

  return (
    <div className={styles.modelCard} onClick={handleClick}>
      <h4 className={styles.brandName}>{brandName}</h4>
      <h3 className={styles.modelName}>{modelName}</h3>
    </div>
  );
};

export default ModelCard;
