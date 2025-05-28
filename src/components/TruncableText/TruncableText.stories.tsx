/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TruncableText } from './TruncableText';
import type { StoryFn, StoryContext } from '@storybook/react';

export default {
  title: 'Components/TruncableText',
  component: TruncableText,
  parameters: {
    containerWidth: {
      control: { type: 'text' },
      defaultValue: '50px'
    }
  },
  decorators: [
    (Story: StoryFn, context: StoryContext) => (
      <div style={{ width: context.parameters.containerWidth, padding: '1rem' }}>
        {Story({}, {} as any)}
      </div>
    )
  ]
};

export const WithControlsWithLongContainer = {
  args: {
    text: 'This is a long text that should be not be truncated because container is too long'
  },
  parameters: {
    containerWidth: '1000px' // Different width for this specific story
  }
};

export const WithControlsWithShortContainer = {
  args: {
    text: 'This is a long text that should be truncated because container is too short'
  },
  parameters: {
    containerWidth: '100px' // Different width for this specific story
  }
};
