import type {ListBoxItemProps, SelectProps, ValidationResult} from 'react-aria-components';
import {FieldError, Text, Select, Label, Button, Popover, ListBox, ListBoxItem, SelectValue} from 'react-aria-components';

import styles from './LanguageSelector.module.scss'

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function MySelect<T extends object>(
  { label, description, errorMessage, children, items, ...props }:
    MySelectProps<T>
) {
  return (
    <Select {...props}>
      {/* <Label>{label}</Label> */}
      <Button className={styles['select-button']}>
        <SelectValue className={styles['select-value']} />
        <span className={styles['select-button-drop-icon']} aria-hidden="true">▼</span>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox className={styles['option-list']} items={items}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
}

export function MyItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      // className={({ isFocused, isSelected }) =>
      //   `my-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`}
    />
  );
}