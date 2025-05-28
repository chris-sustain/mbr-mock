import { fn } from '@storybook/test';
import type { Meta } from '@storybook/react';
import { CaretLeftIcon, CalendarDotsIcon } from '@phosphor-icons/react';
import { CustomButton } from './CustomButton';
import { CustomIcon } from '../CustomIcon/CustomIcon';

const iconPropMapping = {
  'CustomIcon: name="add", size="1em"': <CustomIcon name="add" size={'1em'} color="currentColor" />,
  'CustomIcon: name="add", size="1.5em"': (
    <CustomIcon name="add" size={'1.5em'} color="currentColor" />
  ),
  '➡️': '➡️',
  '❤️': '❤️',
  '🐱': '🐱',
  'Phosphor icon: CaretLeftIcon 1.2em': <CaretLeftIcon size="1.2em" color="currentColor" />,
  'Phosphor icon: CalendarDotsIcon 1.3em': <CalendarDotsIcon size="1.3em" color="currentColor" />,
  none: undefined
};

const iconPropOptions = Object.keys(iconPropMapping);

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
      control: {
        type: 'text'
      },
      description: 'The content to display in the button.'
    },
    variant: {
      table: {
        category: 'Main',
        order: 2,
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      },
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'tertiary']
      },
      description: 'The variant of the button.'
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
        'If set, applies **justify-content: [value]** to the button. Useful for [startIcon, children, endIcon] placement when the button is wide enough.'
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
        "If set, applies 'ellipsis', 'wrap' or 'nowrap' behavior to the children container div of the button. Useful for the text."
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
      control: 'select',
      options: iconPropOptions,
      mapping: iconPropMapping,
      description: 'The icon to display at the start of the button.',
      table: {
        category: 'Icons',
        order: 50,
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    endIcon: {
      control: 'select',
      options: iconPropOptions,
      mapping: iconPropMapping,
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
        disable: true,
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

export const StartIcon = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `startIcon` and `endIcon` props. You can pass a React node or components such as CustomIcon and Phosphor icons.<br/>Use `color="currentColor"` of the CustomIcon to automatically inherit the CustomButton text color of the variant. Phosphor icons already use "currentColor" by default. <br/>Use a height of 1.5 times the font size for the icon to match the height of the text (line height is 1.5). This ensures that the button height remains the same whether it contains text, just an icon, or both.<br/>Recommended line heights to use for each size: **small: 21px**, **medium: 24px**, **large: 27px**. For CustomIcon, use `size="1.5em"` to automatically match the line-height of each CustomButton size.<br/>Use css scale to adjust the icon size of the CustomIcon if needed, e.g., `style={{ transform: "scale(1.1)" }}`.'
      }
    }
  },
  args: {
    startIcon: iconPropOptions[1] // 'CustomIcon: name="add", size="1.5em"'
  }
};

export const EndIcon = {
  args: {
    endIcon: iconPropOptions[2] // '➡️'
  }
};

export const StartEndIcons = {
  args: {
    startIcon: iconPropOptions[1],
    endIcon: iconPropOptions[2]
  }
};

export const Icon = {
  parameters: {
    docs: {
      description: {
        story:
          'The padding is adjusted in case there is only an icon in the button (startIcon or endIcon), to allow **isRounded** to properly make the button a circle. Works as long as the icon is a square.'
      }
    }
  },
  args: {
    children: undefined,
    startIcon: iconPropOptions[1], // 'Phosphor icon: CaretLeftIcon 1.2em'
    isRounded: true
  }
};

export const LongText = {
  args: {
    children:
      'This is a very long text that should not wrap and should be truncated if it exceeds the button width.',
    textBehavior: 'nowrap',
    isFullWidth: true
  }
};
