const NumberInput = ({
  name,
  placeholder = '',
  required = false,
  elementClasses = '',
  validationDependencies = [],
  register = () => {}
}) => {
  return (
    <input
      type="number"
      {...register(name, { required, deps: validationDependencies })}
      placeholder={placeholder}
      className={`${elementClasses}`}
    />
  );
};

export default NumberInput;
