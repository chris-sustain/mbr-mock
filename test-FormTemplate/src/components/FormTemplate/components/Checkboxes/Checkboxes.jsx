import styles from './Checkboxes.module.scss';

const Checkboxes = ({
  name,
  required = false,
  options = [],
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  return (
    <div className={styles['root']}>
      {options.map((option) => (
        <label key={option.value} className={styles['label']}>
          <input
            type="checkbox"
            value={option.value}
            {...register(name, { required, deps: validationDependencies })}
            className={`${elementClasses} ${styles['input']}`}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Checkboxes;
