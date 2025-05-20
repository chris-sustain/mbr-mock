import type { StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { type FocusEvent } from 'react';
import DatePicker from './DatePicker';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
};

export const Base: StoryObj<typeof DatePicker> = {
  args: {
    label: "Date début",
  },
}