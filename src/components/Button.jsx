import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  const buttonClasses = `${styles.button} ${className}`;

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
