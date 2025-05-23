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
    children: {
      table: {
        category: 'Main',
        order: 1
      },
      description: 'The content to display in the button.'
    },
    color: {
      table: {
        category: 'Main',
        order: 2,
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      },
      control: {
        type: 'radio',
        options: ['primary', 'outlined', 'tertiary']
      },
      description: 'The color (variant) of the button.'
    },
    size: {
      table: {
        category: 'Main',
        order: 3,
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      },
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large']
      },
      description: 'The size of the button.'
    },
    isRounded: {
      table: {
        category: 'Main',
        order: 4
      }
    },
    isFullWidth: {
      table: {
        category: 'Main',
        order: 5
      }
    },
    isDisabled: {
      table: {
        category: 'Main',
        order: 6,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      },
      control: {
        type: 'boolean'
      },
      description:
        'Whether the button is disabled or not. Passed directly to the AriaButton component.'
    },
    onPress: {
      control: 'none',
      description: 'Function to call when the button is pressed.',
      table: {
        category: 'Callbacks',
        order: 100,
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' }
      }
    },
    className: {
      table: {
        category: 'Misc',
        order: 200
      }
    },
    ref: {
      control: 'none',
      description: 'A ref to the react-aria Button.',
      table: {
        category: 'Misc',
        order: 201,
        type: { summary: 'React.Ref<HTMLButtonElement> | React.Ref<HTMLDivElement>' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  args: {
    children: 'Custom Button',
    color: 'primary',
    size: 'medium',
    isRounded: false,
    isFullWidth: false,
    isDisabled: false,
    className: '',
    onPress: fn(),
    ref: null
  }
};

export const Default = {};

export const FullWidth = {
  args: {
    isFullWidth: true
  },
  render: (args: typeof CustomButton) => {
    return (
      <div style={{ width: '300px', background: '#f0f0f0', padding: '20px' }}>
        Containing block of 300px width.
        <CustomButton {...args}>Wide test</CustomButton>
      </div>
    );
  }
};
