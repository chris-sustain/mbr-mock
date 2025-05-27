import { PlusIcon } from '@phosphor-icons/react';
import { useState, type ReactNode } from 'react';
import { Button } from 'react-aria-components';
import { v4 as uuidv4 } from 'uuid';
import styles from './FieldArray.module.scss';

export function FieldArray<P>({
  addButtonLabel,
  children,
  defaultValues = []
}: {
  addButtonLabel: string;
  children: (field: { id: string; defaultValue?: P }, index: number) => ReactNode;
  defaultValues?: P[];
}) {
  const initialFields =
    defaultValues.length > 0
      ? defaultValues.map((defaultValue) => ({ id: uuidv4(), defaultValue }))
      : [{ id: uuidv4() }];

  const [fields, setFields] = useState<{ id: string; defaultValue?: P }[]>(initialFields);

  const addField = () => setFields([...fields, { id: uuidv4() }]);

  return (
    <div className={styles.array}>
      {fields.map((field, index) => children(field, index))}
      <Button className={styles.addButton} onPress={addField}>
        <span>{addButtonLabel}</span>
        <PlusIcon />
      </Button>
    </div>
  );
}
