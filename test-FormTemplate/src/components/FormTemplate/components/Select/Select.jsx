import styles from './Select.module.scss';

const Select = ({
  name,
  placeholder = '',
  required = false,
  options = [],
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  return (
    <select
      name={name}
      {...register(name, { required, deps: validationDependencies })}
      className={`${elementClasses} ${styles['root']}`}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
