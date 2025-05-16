import styles from './Textarea.module.scss';

const Textarea = ({
  name,
  placeholder = '',
  required = false,
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  return (
    <textarea
      {...register(name, { required, deps: validationDependencies })}
      rows={3}
      placeholder={placeholder}
      className={`${elementClasses} ${styles['root']}`}
    />
  );
};

export default Textarea;
