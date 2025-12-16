import styles from './InputField.module.css';

const InputField = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = '',
}) => {
  const inputClasses = `${styles.input} ${className}`;
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={inputClasses}
    />
  );
};

export default InputField;
