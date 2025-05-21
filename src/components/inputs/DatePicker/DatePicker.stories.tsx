import type { StoryObj } from '@storybook/react';
import { Button, Form } from 'react-aria-components';
import { parseDate, type DateValue } from '@internationalized/date';
import { userEvent, within, expect } from '@storybook/test';
import DatePicker from './DatePicker';
import { useState } from 'react';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker
};

export const Base: StoryObj<typeof DatePicker> = {
  args: {
    label: 'Date de signature',
    isRequired: true,
    defaultOpen: false,
    shouldCloseOnSelect: true,
    minValue: parseDate('2000-01-01'),
    maxValue: parseDate('2020-01-01'),
    defaultValue: parseDate('2010-01-01')
  }
};

export const InvalidStartDate: StoryObj<typeof DatePicker> = {
  render: (args) => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <DatePicker {...args} />
      <Button type="submit">submit</Button>
    </Form>
  ),
  args: {
    label: 'Date trop tôt',
    defaultValue: parseDate('1800-02-03'),
    minValue: parseDate('2000-01-01')
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const error = /01\/01\/2000 ou ultérieure|1\/1\/2000 or later/i;

    await user.click(canvas.getByRole('button', { name: /submit/i }));
    expect(canvas.getByText(error)).toBeVisible();

    await user.click(canvas.getByRole('spinbutton', { name: /(année|year)/i }));
    await user.keyboard('2010');
    expect(canvas.getByText(error)).toBeVisible();
  }
};

export const CustomValidation: StoryObj<typeof DatePicker> = {
  render: () => {
    // fixed here but can be from an another input. See FieldGroup
    const startDate = parseDate('2020-01-01');

    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <DatePicker
          label="Pay date"
          defaultValue={parseDate('2018-01-01')}
          validate={(val: DateValue) =>
            startDate.compare(val) > 0 ? 'Pay date must be after start date' : undefined
          }
        />
        <Button type="submit">submit</Button>
      </Form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const error = /Pay date must be after start date/i;

    await user.click(canvas.getByRole('button', { name: /submit/i }));
    expect(canvas.getByText(error)).toBeVisible();

    // Not an input, so util user.type doesn’t work
    await user.click(canvas.getByRole('spinbutton', { name: /(année|year), pay/i }));
    await user.keyboard('2022');
    await user.click(canvas.getByRole('button', { name: /submit/i }));
    expect(canvas.queryByText(error)).not.toBeInTheDocument();
  }
};
