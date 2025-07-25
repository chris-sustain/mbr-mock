import { CalendarDotsIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import classNames from 'classnames';
import { type ReactNode, useContext } from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  type DateInputProps,
  DatePicker as ReactAriaDatePicker,
  type DatePickerProps,
  DatePickerStateContext,
  DateRangePicker as ReactAriaDateRangePicker,
  type DateRangePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  FieldError,
  Group,
  Heading,
  Popover,
  RangeCalendar
} from 'react-aria-components';

import { Label } from '../Label';

import styles from './DatePicker.module.scss';

function StyledDateInput(props: Omit<DateInputProps, 'children'>) {
  return (
    <DateInput {...props}>
      {(segment) => <DateSegment segment={segment} className={styles.segment} />}
    </DateInput>
  );
}

function DateInputButton({ children }: { children: ReactNode }) {
  const { isOpen = false } = useContext(DatePickerStateContext) || {};

  return (
    <Group className={classNames(styles.input, { [styles.isOpen]: isOpen })}>
      {children}
      <Button className={styles.button}>
        <CalendarDotsIcon size={16} />
      </Button>
    </Group>
  );
}

function CalendarContent() {
  return (
    <>
      <header className={styles.header}>
        <Heading />
        <div>
          <Button slot="previous" className={styles.navButton}>
            <CaretLeftIcon />
          </Button>
          <Button slot="next" className={styles.navButton}>
            <CaretRightIcon />
          </Button>
        </div>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} className={styles.cell} />}</CalendarGrid>
    </>
  );
}

export function DatePicker({
  label,
  ...datePickerProps
}: {
  label: string;
} & DatePickerProps<DateValue>) {
  const { isRequired } = datePickerProps;

  return (
    <ReactAriaDatePicker {...datePickerProps}>
      <div className={styles.field}>
        <Label isRequired={isRequired}>{label}</Label>
        <DateInputButton>
          <StyledDateInput />
        </DateInputButton>
      </div>
      <FieldError className={styles.error} />
      <Popover className={styles.popover}>
        <Dialog>
          <Calendar className={styles.calendar}>
            <CalendarContent />
          </Calendar>
        </Dialog>
      </Popover>
    </ReactAriaDatePicker>
  );
}

export function DateRangePicker({
  label,
  ...datePickerProps
}: {
  label: string;
} & DateRangePickerProps<DateValue>) {
  const { isRequired } = datePickerProps;
  return (
    <ReactAriaDateRangePicker {...datePickerProps}>
      <div className={styles.field}>
        <Label isRequired={isRequired}>{label}</Label>
        <DateInputButton>
          <StyledDateInput slot="start" />
          <span aria-hidden="true" className={styles.separator}>
            -
          </span>
          <StyledDateInput slot="end" />
        </DateInputButton>
      </div>
      <FieldError className={styles.error} />
      <Popover className={styles.popover}>
        <Dialog>
          <RangeCalendar className={styles.rangeCalendar}>
            <CalendarContent />
          </RangeCalendar>
        </Dialog>
      </Popover>
    </ReactAriaDateRangePicker>
  );
}
