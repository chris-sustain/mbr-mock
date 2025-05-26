import { useState, type ReactNode } from 'react';
import { Button } from 'react-aria-components';
import { PlusIcon } from '@phosphor-icons/react';
import styles from './FieldArray.module.scss';

export function FieldArray({
  addButtonLabel,
  children
}: {
  addButtonLabel: string;
  children: ReactNode;
}) {
  const [fields, setFields] = useState<ReactNode[]>([children]);
  const addField = () => setFields([...fields, children]);
  return (
    <div className={styles.array}>
      {fields.map(() => children)}
      <Button className={styles.addButton} onPress={addField}>
        <span>{addButtonLabel}</span>
        <PlusIcon />
      </Button>
    </div>
  );
}
