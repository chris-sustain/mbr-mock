import { fn } from '@storybook/test';
import { CustomButton } from './CustomButton';

export default {
  title: 'Components/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional class names to apply to the react-aria Button.' },
    children: {
      description: 'The content to display in the button.'
    },
    ref: {
      control: 'none',
      description: 'A ref to the react-aria Button.',
      table: {
        type: { summary: 'React.Ref<HTMLButtonElement> | React.Ref<HTMLDivElement>' },
        defaultValue: { summary: 'null' }
      },
    },
    onPress: {
      control: 'none',
      description: 'Function to call when the button is pressed.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' }
      },
    },
  },
  args: {
    className: '',
    children: 'Button',
    ref: null,
    onPress: fn(),
  }
};

export const Default = {};