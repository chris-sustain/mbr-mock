import { fn } from '@storybook/test';
import { CustomButton, type CustomButtonProps } from './CustomButton';
import { CustomIcon } from '../CustomIcon/CustomIcon';

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
    startIcon: {
      control: 'text',
      description: 'The icon to display at the start of the button.',
      table: {
        category: 'Icons',
        order: 7,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    endIcon: {
      control: 'text',
      description: 'The icon to display at the end of the button.',
      table: {
        category: 'Icons',
        order: 8,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    onPress: {
      control: 'none',
      description: 'Function to call when the button is pressed.',
      table: {
        category: 'Callbacks',
        order: 9,
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' }
      }
    },
    className: {
      table: {
        category: 'Misc',
        order: 10
      }
    },
    ref: {
      control: 'none',
      description: 'A ref to the react-aria Button.',
      table: {
        category: 'Misc',
        order: 11,
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

export const Default = {
  render: (args: CustomButtonProps) => {
    return (
      <div
        style={{
          display: 'flex',
          width: '300px',
          justifyContent: 'center'
        }}>
        <CustomButton {...args} />
      </div>
    );
  }
};

export const WithStartAndEndIcons = {
  parameters: {
    docs: {
      description: {
        story:
          'The `startIcon` and `endIcon` props add icons to the button. You can use any React node as an icon, but typically you would use a CustomIcon component. Use color="currentColor" to inherit the CustomButton text color.'
      }
    }
  },
  render: (args: CustomButtonProps) => {
    const { startIcon, endIcon } = args;

    return (
      <div
        style={{
          display: 'flex',
          width: '300px',
          justifyContent: 'center'
        }}>
        <CustomButton
          {...args}
          startIcon={
            startIcon ? startIcon : <CustomIcon name="add" size={24} color="currentColor" />
          }
          endIcon={endIcon ? endIcon : <span>➡️</span>}>
          Search
        </CustomButton>
      </div>
    );
  }
};
