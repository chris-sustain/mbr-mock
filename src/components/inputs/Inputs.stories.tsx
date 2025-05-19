import type { StoryObj } from '@storybook/react';
import type { FocusEvent } from 'react';
import TextIpnut from './Text/Text';

export default {
  title: 'Inputs/TextInput',
  component: TextIpnut
};

export const Base: StoryObj<typeof TextIpnut> = {
  args: {
    type: 'text',
    label: 'Label',
    error: "",
    isRequired: true,
    isDisabled: false,
    isReadOnly: false,
    textArea: false,
    onChange: (val: string) => {
      console.log(val);
    },
    onBlur: (e: FocusEvent<HTMLInputElement, Element>) => {
      console.log("blur", e.target.value);
    }
  },
};
