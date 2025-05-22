import type { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { type FocusEvent } from 'react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox
};

export const Base: StoryObj<typeof Checkbox> = {
  args: {
    // Basic props
    value: 'checkbox',

    // Event handlers
    onChange: (isSelected: boolean) => {
      console.log('Selected:', isSelected);
    },
    onFocus: (_: FocusEvent) => {
      console.log('Focused');
    },
    onBlur: (_: FocusEvent) => {
      console.log('Blurred');
    },
    onFocusChange: (isFocused: boolean) => {
      console.log('Focus changed:', isFocused);
    }
  }
};

export const Disabled: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args,
    isDisabled: true
  }
};

export const Indeterminate: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args,
    isIndeterminate: true
  }
};

export const Selected: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args,
    isSelected: true
  }
};

export const Hover: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    // Simulate hover
    await userEvent.hover(checkbox);
  }
};

// Add a story for focus state
export const Focus: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args
  },
  play: async () => {
    // Simulate focus
    await userEvent.tab(); // Tab to focus the checkbox
  }
};

export const Secondary: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args,
    variant: 'secondary'
  }
};

export const SecondaryIndeterminate: StoryObj<typeof Checkbox> = {
  args: {
    ...Base.args,
    variant: 'secondary',
    isIndeterminate: true
  }
};

export const Label: StoryObj<typeof Checkbox> = {
  render: (args) => (
    <>
      <Checkbox {...args}>Some label</Checkbox>
      <Checkbox {...args}>
        <span style={{ color: 'pink' }}>Some pink label</span>
      </Checkbox>
    </>
  ),
  args: Base.args
};
