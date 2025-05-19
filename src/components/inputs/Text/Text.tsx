import {TextField, Input, FieldError, TextArea, type TextFieldProps} from 'react-aria-components';
import Label from "../Label"; 
import styles from  "./styles.module.scss";

export default function TextIpnut({
  label,
  multiline = false,
  ...textFieldProps
}: {
  label: string;
  multiline?: boolean;
} & TextFieldProps) {
  const Cmp = multiline ? TextArea : Input;
  const { isRequired } = textFieldProps;

  return (
    <TextField className={styles.field} {...textFieldProps}>
      <Label isRequired={isRequired}>{label}</Label>
      <Cmp />
      <FieldError className={styles.error} />
    </TextField>
  );
}