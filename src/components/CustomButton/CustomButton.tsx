import { Button as AriaButton } from 'react-aria-components';
import type { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

import styles from './CustomButton.module.scss';

// Types of the react-aria Button without the common props handled internally by the CustomButton component.
type AriaButtonProps = Omit<ComponentPropsWithRef<typeof AriaButton>, 'className' | 'children'>;

export type CustomButtonProps = AriaButtonProps & {
  /** The content of the button. */
  children?: React.ReactNode;
  /** Additional className applied to the react-aria Button. */
  className?: string;
  /** The color (variant) of the button. */
  color?: 'primary' | 'outlined' | 'tertiary';
  /** The size of the button. */
  size?: 'small' | 'medium' | 'large';
  /** Defaults to 'center'. If set, applies **justify-content: [value]** to the button. */
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Defaults to 'normal'. If set, applies 'ellipsis', 'wrap' or 'nowrap' behavior to the button text. */
  textBehavior?: 'normal' | 'ellipsis' | 'wrap' | 'nowrap';
  /** Defaults to false. If true, applies fully rounded borders. */
  isRounded?: boolean;
  /** Defaults to false. If true, adds **width: 100%** to the button. */
  isFullWidth?: boolean;
  /** The icon to display at the start of the button. */
  startIcon?: React.ReactNode;
  /** The icon to display at the end of the button. */
  endIcon?: React.ReactNode;
};

/**
 * CustomButton component that wraps the react-aria-components Button.
 * Some props are passed directly to the Button while others are specific to this component.
 * Refer to the Storybook for more information on the props and their usage.
 * https://react-spectrum.adobe.com/react-aria/Button.html
 */
export const CustomButton = ({
  children,
  className,
  color = 'primary',
  size = 'medium',
  justifyContent = 'center',
  textBehavior = 'normal',
  isRounded,
  isFullWidth,
  startIcon,
  endIcon,
  ...rest
}: CustomButtonProps) => {
  const buttonClassName = classNames(styles['button'], className, {
    [styles[`color-${color}`]]: color,
    [styles[`size-${size}`]]: size,
    [styles['rounded']]: isRounded,
    [styles['full-width']]: isFullWidth,
    [styles[`justify-${justifyContent}`]]: justifyContent
  });

  const contentClassName = classNames(styles['content'], {
    [styles[`text-behavior-${textBehavior}`]]: textBehavior
  });

  return (
    <AriaButton {...rest} className={buttonClassName}>
      <IconWrapper>{startIcon}</IconWrapper>
      <div className={contentClassName}>{children}</div>
      <IconWrapper>{endIcon}</IconWrapper>
    </AriaButton>
  );
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => {
  if (children === undefined || children === null) {
    return null;
  }

  return <div className={styles['icon-wrapper']}>{children}</div>;
};

// todo: remove
// export const Test = () => {
//   return (
//     <CustomButton className={styles['temp']} onPress={() => console.warn('Button pressed')}>
//       {'aze'}
//     </CustomButton>
//   );
// };
