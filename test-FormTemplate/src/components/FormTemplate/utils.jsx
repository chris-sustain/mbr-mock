import * as yup from 'yup';

import FieldArray from './components/FieldArray/FieldArray';
import TextInput from './components/TextInput/TextInput';
import Textarea from './components/Textarea/Textarea';
import NumberInput from './components/NumberInput/NumberInput';
import Checkboxes from './components/Checkboxes/Checkboxes';
import Select from './components/Select/Select';
import Radios from './components/Radios/Radios';

import styles from './FormTemplate.module.scss';

export const generateValidationSchema = (fields, errorMessages) => {
  const schema = {};
  fields.forEach((field) => {
    let { type, name, required, validations } = field;

    if (
      type === 'text' ||
      type === 'textarea' ||
      type === 'number' ||
      type === 'select' ||
      type === 'radios'
    ) {
      schema[name] = yup.string();
    } else if (type === 'checkboxes') {
      schema[name] = yup.array().of(yup.string());
    } else if (type === 'array') {
      schema[name] = yup.array().of(generateValidationSchema(field.fields, errorMessages));
    } else {
      console.error(`Unknown field type: ${type}`);
      return;
    }

    if (required) {
      if (type === 'checkboxes') {
        schema[name] = schema[name].min(1, errorMessages.AtLeastOneChoiceRequired);
      }
      schema[name] = schema[name].required(errorMessages.ThisFieldIsRequired);
    }

    if (validations) {
      validations.forEach((validation) => {
        schema[name] = schema[name].test(validation.name, validation.message, validation.test);
      });
    }
  });

  return yup.object().shape(schema);
};

export const generateDefaultValues = (fields) => {
  let defaultValues = {};

  fields.forEach(({ type, defaultValue, name }) => {
    if (['text', 'textarea', 'number', 'select', 'radios'].includes(type)) {
      defaultValues[name] = defaultValue || '';
    } else if (type === 'checkboxes') {
      defaultValues[name] = defaultValue || [];
    } else if (type === 'array') {
      defaultValues[name] = defaultValue || [{}];
    }
  });
  return defaultValues;
};

export const renderField = ({ props, control, register, errors }) => {
  switch (props.type) {
    case 'text':
      return <TextInput {...props} key={props.key} elementClasses={styles['text-input']} />;
    case 'textarea':
      return <Textarea {...props} key={props.key} elementClasses={styles['textarea']} />;
    case 'number':
      return <NumberInput {...props} key={props.key} elementClasses={styles['number-input']} />;
    case 'checkboxes':
      return <Checkboxes {...props} key={props.key} />;
    case 'select':
      return <Select {...props} key={props.key} />;
    case 'radios':
      return <Radios {...props} key={props.key} />;
    case 'array':
      return (
        <FieldArray
          {...props}
          key={props.key}
          control={control}
          register={register}
          errors={errors}
        />
      );
    default:
      return null;
  }
};
