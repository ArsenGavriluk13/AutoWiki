import styles from './ModelCard.module.css';

const ModelCard = ({ brandName, modelName, onClick }) => {
  return (
    <div className={styles.modelCard} onClick={onClick}>
      <h4 className={styles.brandName}>{brandName}</h4>
      <h3 className={styles.modelName}>{modelName}</h3>
    </div>
  );
};

export default ModelCard;
