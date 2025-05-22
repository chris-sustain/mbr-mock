import { Button as AriaButton } from 'react-aria-components';
import type { PropsWithChildren, ComponentProps } from 'react';
import classNames from 'classnames';

import styles from './CustomButton.module.scss';

// Use the types of the props of AriaButton without the common props which are internally handled by the CustomButton component.
type AriaButtonProps = Omit<ComponentProps<typeof AriaButton>, 'className' | 'children'>;

type CustomButtonProps = PropsWithChildren<AriaButtonProps> & {
  /** Additional className applied to the react-aria Button. */
  className?: string;
  /** The color (variant) of the button. */
  color?: 'primary' | 'outlined' | 'tertiary';
  /** The size of the button. */
  size?: 'small' | 'medium' | 'large';
  /** Defaults to false. If true, applies fully rounded borders. */
  isRounded?: boolean;
  /** Defaults to false. If true, adds **width: 100%** to the button. */
  isFullWidth?: boolean;
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
  isRounded,
  isFullWidth,
  ...rest
}: CustomButtonProps) => {
  const buttonClassName = classNames(
    styles['button'],
    className,
    {
      [styles[`color-${color}`]]: color,
      [styles[`size-${size}`]]: size,
      [styles['rounded']]: isRounded,
      [styles['full-width']]: isFullWidth,
    }
  );

  return (
    <AriaButton {...rest} className={buttonClassName}>
      {children}
    </AriaButton>
  );
};

// export const Test = () => {
//   return (
//     <CustomButton className={styles['temp']} onPress={() => console.warn('Button pressed')}>
//       {'aze'}
//     </CustomButton>
//   );
// };
