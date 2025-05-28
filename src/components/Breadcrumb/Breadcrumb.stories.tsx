import { Breadcrumb } from './Breadcrumb';
import { BrowserRouter } from 'react-router';
import type { StoryFn } from '@storybook/react';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [(Story: StoryFn) => <BrowserRouter>{Story({}, {} as any)}</BrowserRouter>],
  argTypes: {
    name: {
      control: 'select',
      options: [undefined, 'eye', 'pen'],
      description: 'Icon to display in the breadcrumb (optional)'
    },
    title: {
      control: 'text',
      description: 'Title text to display'
    }
  }
};

export const Default = () => <Breadcrumb />;

export const WithControls = {
  args: {
    title: 'Home',
    name: 'pen'
  }
};

export const EditBreadcrumb = () => <Breadcrumb title="Home" name="pen" />;

export const ViewBreadcrumb = () => <Breadcrumb title="Home" name="eye" />;
