import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  type SelectProps,
  SelectValue
} from 'react-aria-components';

import styles from './LanguageSelector.module.scss';

export function LanguageSelector<T extends object>({ ...props }: SelectProps<T>) {
  const options = [
    { code: 'en', icon: <img src="/src/assets/icons/uk.svg" height={24} width={24} /> },
    { code: 'fr', icon: <img src="/src/assets/icons/france.svg" height={24} width={24} /> },
    { code: 'es', icon: <img src="/src/assets/icons/spain.svg" height={24} width={24} /> },
    { code: 'br', icon: <img src="/src/assets/icons/brazil.svg" height={24} width={24} /> }
  ];

  return (
    <Select {...props}>
      <Button className={styles['select-button']}>
        <SelectValue className={styles['select-value']} />
        <div className={styles['select-button-drop-icon']} aria-hidden="true">
          <CaretDownIcon />
        </div>
      </Button>
      <Popover>
        <ListBox className={styles['option-list']} items={options}>
          {(item) => <ListBoxItem id={item.code}>{item.icon}</ListBoxItem>}
        </ListBox>
      </Popover>
    </Select>
  );
}
