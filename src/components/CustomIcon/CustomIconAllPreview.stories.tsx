import { CustomIcon } from './CustomIcon';
import { getSVGIconsAsComponents } from './utils';

const icons = getSVGIconsAsComponents();

export const AllIcons = ({ className, size = 24, color = '#000' }) => (
  <div
    style={{
      maxHeight: '40vh',
      minWidth: '60vw',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '2rem',
      justifyItems: 'center',
      alignItems: 'center'
    }}>
    {Object.keys(icons).map((name) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <CustomIcon name={name} className={className} size={size} color={color} />
        <div style={{ marginTop: 8, fontSize: '14px' }}>{name}</div>
      </div>
    ))}
  </div>
);

export default {
  title: 'Components/CustomIconAllPreview',
  component: AllIcons,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    color: { control: 'color' },
    size: { control: 'number' }
  },
  args: {
    size: 24,
    color: '#000'
  }
};
