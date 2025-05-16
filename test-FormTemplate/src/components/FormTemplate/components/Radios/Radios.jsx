import styles from './Radios.module.scss';

const Radios = ({
  name,
  required = false,
  options = [],
  labelPosition = 'right',
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  if (options.length === 0) return null;

  return (
    <div className={styles['root']}>
      {options.map((option) => (
        <label key={option.value} className={styles['input-label']}>
          {labelPosition === 'left' && option.label}
          <input
            type="radio"
            value={option.value}
            {...register(name, { required, deps: validationDependencies })}
            className={`${elementClasses} ${styles['input']}`}
          />
          {labelPosition === 'right' && option.label}
        </label>
      ))}
    </div>
  );
};

export default Radios;
