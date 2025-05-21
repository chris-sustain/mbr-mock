import { useContext } from 'react';
import classNames from 'classnames';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as ReactAriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
  type DatePickerProps,
  type DateValue,
  DatePickerStateContext,
  FieldError
} from 'react-aria-components';
import { Label } from '../Label';

import styles from './DatePicker.module.scss';

function DateInputButton() {
  const { isOpen = false } = useContext(DatePickerStateContext) || {};

  return (
    <Group className={classNames(styles.input, { [styles.isOpen]: isOpen })}>
      <DateInput>
        {(segment) => <DateSegment segment={segment} className={styles.segment} />}
      </DateInput>
      <Button className={styles.button}>▼</Button>
    </Group>
  );
}

export default function DatePicker({
  label,
  popoverBoundary,
  ...datePickerProps
}: {
  label: string;
  popoverBoundary?: Element;
} & DatePickerProps<DateValue>) {
  const { isRequired } = datePickerProps;

  return (
    <ReactAriaDatePicker {...datePickerProps}>
      <div className={styles.field}>
        <Label isRequired={isRequired}>{label}</Label>
        <DateInputButton />
      </div>
      <FieldError className={styles.error} />
      <Popover className={styles.popover} boundaryElement={popoverBoundary}>
        <Dialog>
          <Calendar>
            <header className={styles.header}>
              <Heading />
              <div>
                <Button slot="previous" className={styles.navButton}>
                  {'<'}
                </Button>
                <Button slot="next" className={styles.navButton}>
                  {'>'}
                </Button>
              </div>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} className={styles.cell} />}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </ReactAriaDatePicker>
  );
}
