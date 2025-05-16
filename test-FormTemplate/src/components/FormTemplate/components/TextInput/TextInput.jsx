const TextInput = ({
  name,
  placeholder = '',
  required = false,
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  return (
    <input
      {...register(name, { required, deps: validationDependencies })}
      placeholder={placeholder}
      className={`${elementClasses}`}
    />
  );
};

export default TextInput;
