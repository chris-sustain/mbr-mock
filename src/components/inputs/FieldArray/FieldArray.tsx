import { PlusIcon } from '@phosphor-icons/react';
import classNames from 'classnames';
import { type ReactNode, useState } from 'react';
import { Button } from 'react-aria-components';
import { v4 as uuidv4 } from 'uuid';

import { CustomIcon } from '@src/components/CustomIcon';

import styles from './FieldArray.module.scss';

interface Field<T> {
  id: string;
  defaultValue?: T;
}

export function FieldArray<T>({
  addButtonLabel,
  defaultValues = [],
  children
}: {
  addButtonLabel: string;
  defaultValues?: T[];
  children: (field: Field<T>, index: number) => ReactNode;
}) {
  const initialFields = defaultValues.map((value) => ({ id: uuidv4(), defaultValue: value }));
  const [fields, setFields] = useState<{ id: string; defaultValue?: T }[]>(initialFields);

  const addField = () => setFields([...fields, { id: uuidv4() }]);
  const removeField = (index: number) => setFields(fields.filter((_, i) => i !== index));

  const cantDelete = fields.length <= 1;

  return (
    <div className={styles.array}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldRow}>
          <div className={styles.fieldContent}>{children(field, index)}</div>
          <Button
            className={classNames(styles.removeButton, { [styles.invisible]: cantDelete })}
            onPress={() => removeField(index)}
            isDisabled={cantDelete}
            aria-label="remove"
            aria-hidden={cantDelete}>
            <CustomIcon name="minus" />
          </Button>
        </div>
      ))}
      <Button className={styles.addButton} onPress={addField}>
        <span>{addButtonLabel}</span>
        <PlusIcon />
      </Button>
    </div>
  );
}
