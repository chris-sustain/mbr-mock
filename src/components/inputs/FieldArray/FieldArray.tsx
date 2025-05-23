import { useState, type ReactNode } from 'react';
import type { PressEvent } from 'react-aria-components';

export function FieldArray({
  input,
  addButton
}: {
  input: ReactNode;
  addButton: (onPress: (e: PressEvent) => void) => ReactNode;
}) {
  const [fields, setFields] = useState<ReactNode[]>([input]);
  const addField = () => setFields([...fields, input]);
  return (
    <div>
      {fields.map(() => input)}
      {addButton(addField)}
    </div>
  );
}
