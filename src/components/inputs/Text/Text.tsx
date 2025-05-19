import {TextField, Input, FieldError, TextArea, type TextFieldProps} from 'react-aria-components';
import Label from "../Label"; 
import styles from  "./styles.module.scss";

export default function TextIpnut({
    label,
    error,
    textArea = false,
    ...textFieldProps
}: {
    label: string;
    error?: string;
    textArea?: boolean;
} & TextFieldProps) {
    const Cmp = textArea ? TextArea : Input;
    const { isRequired } = textFieldProps;
    console.log(isRequired)
    return (
        <TextField 
            isInvalid={!!error}
            className={styles.field}
            {...textFieldProps}
        >
            <Label isRequired={isRequired}>{label}</Label>
            <Cmp />
            {error && (
                <FieldError className={styles.error}>
                    {error}
                </FieldError>
            )}
        </TextField>
    )
}