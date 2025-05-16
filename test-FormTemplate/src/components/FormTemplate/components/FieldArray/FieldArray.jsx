import React from 'react';
import { useFieldArray } from 'react-hook-form';
import FieldWrapper from '../FieldWrapper/FieldWrapper';

import { renderField } from '../../utils';

import styles from './FieldArray.module.scss';

const FieldArray = ({
  name,
  fields = [],
  addButtonContent = '+ Add',
  removeButtonContent = '- Remove',
  maxItems = Infinity,
  control = {},
  register = () => {},
  errors = {}
}) => {
  const {
    fields: fieldArray,
    append,
    remove
  } = useFieldArray({
    control,
    name,
    rules: {
      deps: fields.reduce((acc, field) => {
        if (field.validationDependencies) {
          acc[field.name] = field.validationDependencies;
        }
        return acc;
      }, {})
    }
  });

  const renderRemoveButton = () => {
    if (fieldArray.length <= 1) {
      return null;
    }

    if (typeof removeButtonContent === 'function') {
      return removeButtonContent({
        onClick: () => remove(fieldArray.length - 1),
        hoverEffectClass: styles['remove-button-hover']
      });
    } else {
      return (
        <button
          type="button"
          onClick={() => remove(fieldArray.length - 1)}
          className={`${styles['remove-button']} ${styles['remove-button-hover']}`}>
          {removeButtonContent}
        </button>
      );
    }
  };

  const renderAddButton = () => {
    if (fieldArray.length >= maxItems) {
      return null;
    }

    if (typeof addButtonContent === 'function') {
      return addButtonContent({ onClick: () => append({}) });
    } else {
      return (
        <button type="button" onClick={() => append({})} className={styles['add-button']}>
          {addButtonContent}
        </button>
      );
    }
  };

  return (
    <div className={styles['root']}>
      {fieldArray.map((item, index) => {
        let rootErrorMessage = errors[name]?.root?.message;
        return (
          <div key={item.id} className={styles['iteration']}>
            {fields.map((subField) => {
              let errorMessage = '';

              if (errors[name] && errors[name][index] && errors[name][index][subField.name]) {
                errorMessage = errors[name][index][subField.name].message;
              }

              if (rootErrorMessage) {
                errorMessage = rootErrorMessage.concat(' ', errorMessage);
              }

              let title = subField.title;
              if (title && title.includes('{index}')) {
                title = title.replace('{index}', index + 1);
              }

              return (
                <FieldWrapper
                  key={`${subField.name}-${index}`}
                  title={`${title}`}
                  description={subField.description}
                  helper={subField.helper}
                  required={subField.required}
                  errorMessage={errorMessage}
                  wrapperInlineStyle={subField.wrapperInlineStyle}>
                  {renderField({
                    props: {
                      ...subField,
                      key: subField.name,
                      register: register,
                      name: `${name}.${index}.${subField.name}`,
                      defaultValue: item[subField.name]
                    },
                    register,
                    control,
                    errors
                  })}
                </FieldWrapper>
              );
            })}
          </div>
        );
      })}

      {renderRemoveButton()}
      {renderAddButton()}
    </div>
  );
};

export default FieldArray;
