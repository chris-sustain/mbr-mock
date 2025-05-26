import { fn } from '@storybook/test';
import type { Meta } from '@storybook/react';
import { CustomButton, type CustomButtonProps } from './CustomButton';
import { CustomIcon } from '../CustomIcon/CustomIcon';

export default {
  title: 'Components/CustomButton',
  component: CustomButton,
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f0f0f0',
            width: '500px',
            padding: '8px'
          }}>
          <span
            style={{
              color: '#aaa'
            }}>{`500px wide container for full-width and text behavior testing`}</span>
          <Story />
        </div>
      );
    }
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        category: 'Main',
        order: 1,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
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
    justifyContent: {
      table: {
        category: 'Main',
        order: 4,
        type: { summary: 'string' },
        defaultValue: { summary: 'center' }
      },
      control: {
        type: 'radio',
        options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
      },
      description:
        'The justify-content CSS property defines how the browser distributes space between and around content items along the main-axis of a flex container. Defaults to "center".'
    },
    textBehavior: {
      table: {
        category: 'Main',
        order: 5,
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' }
      },
      control: {
        type: 'radio',
        options: ['normal', 'ellipsis', 'wrap', 'nowrap']
      },
      description:
        'If set, applies text behavior to the button. "ellipsis" will truncate text with an ellipsis, while "wrap" will allow text to wrap onto multiple lines.'
    },
    isRounded: {
      table: {
        category: 'Main',
        order: 6,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    isFullWidth: {
      table: {
        category: 'Main',
        order: 7,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    isDisabled: {
      table: {
        category: 'Main',
        order: 8,
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
        order: 50,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    endIcon: {
      control: 'text',
      description: 'The icon to display at the end of the button.',
      table: {
        category: 'Icons',
        order: 51,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    onPress: {
      control: false,
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
        order: 150,
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    ref: {
      control: false,
      description: 'A ref to the react-aria Button.',
      table: {
        category: 'Misc',
        order: 151,
        type: { summary: 'React.Ref<HTMLButtonElement> | React.Ref<HTMLDivElement>' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  args: {
    children: 'Custom Button',
    onPress: fn()
  }
} as Meta<typeof CustomButton>;

export const Default = {};

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
      <CustomButton
        {...args}
        startIcon={startIcon ? startIcon : <CustomIcon name="add" size={24} color="currentColor" />}
        endIcon={endIcon ? endIcon : <span>➡️</span>}
      />
    );
  }
};

export const KeepLongTextOnOneLine = {
  args: {
    children: 'This is a very long text that should not wrap and should be truncated if it exceeds the button width.',
    textBehavior: 'nowrap',
    isFullWidth: true
  }
}
