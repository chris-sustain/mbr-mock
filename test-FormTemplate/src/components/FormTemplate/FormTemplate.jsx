import { useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FieldWrapper from './components/FieldWrapper/FieldWrapper';

import { rightArrow, SVGCloseIcon } from './assets';

import { generateValidationSchema, generateDefaultValues, renderField } from './utils';

import styles from './FormTemplate.module.scss';

const FormTemplate = ({
  title,
  subtitle,
  fields = [],
  onChange,
  onCancel,
  onSubmit,
  onClose,
  cancelText = 'Annuler',
  submitText = 'Valider',
  closeText = 'Fermer',
  resetAfterSubmit = false,
  submitRightArrow = false,
  errorMessages = {
    AtLeastOneChoiceRequired: 'At least one choice is required.',
    ThisFieldIsRequired: 'This field is required.'
  },
  adjustFormValues,
  maxHeight = '100%',
  scrollbarClass = ''
}) => {
  const validationSchema = useMemo(() => {
    return generateValidationSchema(fields, errorMessages);
  }, [fields]);

  const defaultValues = useMemo(() => {
    return generateDefaultValues(fields);
  }, [fields]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const formData = watch();
  const prevFormData = useRef(JSON.parse(JSON.stringify(formData)));

  // Send initial values to parent component, once on mount
  useEffect(() => {
    onChange && onChange(formData);
    adjustFormValues && adjustFormValues(formData, setValue);
  }, []);

  useEffect(() => {
    if (prevFormData.current && JSON.stringify(formData) !== JSON.stringify(prevFormData.current)) {
      prevFormData.current = JSON.parse(JSON.stringify(formData));
      onChange && onChange(formData);
      adjustFormValues && adjustFormValues(formData, setValue);
    }
  }, [formData, onChange]);

  useEffect(() => {
    if (resetAfterSubmit && isSubmitSuccessful) {
      reset();
    }
  }, [resetAfterSubmit, isSubmitSuccessful]);

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const renderCancelBtn = () => {
    if (onCancel && typeof onCancel === 'function') {
      return (
        <button type="button" onClick={onCancel} className={styles['cancel-button']}>
          {cancelText}
        </button>
      );
    }
    return null;
  };

  const renderSubmitBtn = () => {
    if (onSubmit && typeof onSubmit === 'function') {
      return (
        <button type="submit" className={styles['submit-button']}>
          {submitText}
          {submitRightArrow && <img className={styles['right-arrow']} src={rightArrow} />}
        </button>
      );
    }
    return null;
  };

  return (
    <div className={styles['form-template-root']}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`${styles['form']}`}
        style={{ maxHeight: maxHeight }}>
        <div className={styles['top']}>
          {title && <div className={styles['title']}>{title}</div>}
          {subtitle && <div className={styles['subtitle']}>{subtitle}</div>}
          {onClose && typeof onClose === 'function' && (
            <button type="button" onClick={onClose} className={styles['close-button']}>
              {closeText}
              {/* <CloseIcon sx={{ color: '#FFD680' }} /> */}
              {/* <img src={closeIcon} /> */}
              <SVGCloseIcon />
            </button>
          )}
        </div>
        <div className={`${styles['form-fields']} ${scrollbarClass}`}>
          {fields &&
            fields.map((field) => {
              if (
                !field.name ||
                field.name === '' ||
                (field.shouldDisplay && !field.shouldDisplay(formData))
              ) {
                return null;
              }

              let fieldProps = {
                ...field,
                key: field.name,
                register: register
              };

              return (
                <FieldWrapper
                  key={`FieldWrapper ${field.name}`}
                  title={field.title}
                  description={field.description}
                  helper={field.helper}
                  required={field.required}
                  showRequiredAsterisk={field.showRequiredAsterisk}
                  errorMessage={
                    errors[field.name] && field.type !== 'array' ? errors[field.name].message : ''
                  }
                  wrapperInlineStyle={field.wrapperInlineStyle}>
                  {renderField({
                    props: fieldProps,
                    register: register,
                    control: control,
                    errors: errors
                  })}
                </FieldWrapper>
              );
            })}
        </div>
        <div className={styles['form-buttons']}>
          {renderCancelBtn()}
          {renderSubmitBtn()}
        </div>
      </form>
    </div>
  );
};

export default FormTemplate;
