import { CustomIcon } from './CustomIcon';
import { getSVGIconsAsComponents } from './utils';

const icons = getSVGIconsAsComponents();

export default {
  title: 'Components/CustomIcon',
  component: CustomIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    color: { control: 'color' },
    size: { control: 'number' },
    // The "name" must be the name of a file from the "./icons" directory that ends with .svg
    name: {
      control: 'select',
      options: Object.keys(icons)
    }
  },
  args: {
    className: '',
    size: 24,
    color: '#000'
  }
};

export const Default = {
  args: {
    name: 'default'
  }
};
