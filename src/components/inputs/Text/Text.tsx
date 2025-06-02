import classNames from 'classnames';
import { useContext } from 'react';
import { FieldError, Input, TextArea, TextField, type TextFieldProps } from 'react-aria-components';

import { LiveFormContext } from '@src/components/Form/Form';

import { Label } from '../Label';

import styles from './Text.module.scss';

export function TextInput({
  label,
  multiline = false,
  name,
  ...textFieldProps
}: {
  label: string;
  multiline?: boolean;
  name: string;
} & TextFieldProps) {
  const Cmp = multiline ? TextArea : Input;
  const { isRequired, className } = textFieldProps;
  const { saveDraft } = useContext(LiveFormContext);

  return (
    <TextField {...textFieldProps} name={name} className={classNames(styles.field, className)}>
      <Label isRequired={isRequired}>{label}</Label>
      <Cmp onBlur={saveDraft} />
      <FieldError className={styles.error} />
    </TextField>
  );
}
