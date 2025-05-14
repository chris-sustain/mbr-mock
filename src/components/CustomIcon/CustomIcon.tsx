import { useMemo } from 'react';
import { getSVGIconsAsComponents } from './utils';
import type { IconName } from './utils';
import type { SVGProps } from 'react';

interface CustomIconProps {
  className?: string;
  name: IconName;
  size?: number;
  color?: string;
}

export const CustomIcon = ({ className, name, size = 24, color = '#000' }: CustomIconProps) => {
  const iconComponents = useMemo(() => getSVGIconsAsComponents(), []);

  const Icon = iconComponents[name];

  if (!Icon) {
    console.warn(`Icon "${name}" module found but component is missing`);
    return null;
  }

  const svgProps: SVGProps<SVGSVGElement> = {
    className,
    width: size,
    height: size,
    fill: color
  };

  return <Icon {...svgProps} />;
};
