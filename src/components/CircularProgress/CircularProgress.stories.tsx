import type { StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';

export default {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Size of the circular progress in pixels'
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the animated arc'
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Color of the background circle'
    },
    thickness: {
      control: { type: 'number' },
      description: 'Thickness of the circle border in pixels'
    }
  }
};

export const Default: StoryObj<typeof CircularProgress> = {
  args: {}
};

export const Large: StoryObj<typeof CircularProgress> = {
  args: {
    ...Default.args,
    size: 60
  }
};

export const Thick: StoryObj<typeof CircularProgress> = {
  args: {
    ...Default.args,
    thickness: 6
  }
};

export const CustomColors: StoryObj<typeof CircularProgress> = {
  args: {
    ...Default.args,
    color: '#ff0000',
    backgroundColor: '#f0f0f0'
  }
};

export const DarkTheme: StoryObj<typeof CircularProgress> = {
  args: {
    ...Default.args,
    color: 'var(--color-primary, #90caf9)',
    backgroundColor: 'var(--color-background, #121212)'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
};
