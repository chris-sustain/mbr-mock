import { type SVGProps, useMemo } from 'react';

import { getSVGIconsAsComponents, type IconName } from './utils';

interface CustomIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  name: IconName;
  size?: number | string;
  color?: string;
  onClick?: () => void;
}

export const CustomIcon = ({
  className,
  name,
  size = 24,
  color = '#000',
  onClick,
  ...rest
}: CustomIconProps) => {
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
    fill: color,
    onClick,
    ...rest
  };

  return <Icon {...svgProps} />;
};
