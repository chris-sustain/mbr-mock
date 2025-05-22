import { Button as AriaButton } from 'react-aria-components';
import type { PropsWithChildren, ComponentProps } from 'react';
import classNames from 'classnames';

import styles from './CustomButton.module.scss';

// Types of the props of AriaButton, without the props internally handled by the CustomButton component.
type AriaButtonProps = Omit<ComponentProps<typeof AriaButton>, 'className' | 'children'>;

type CustomButtonProps = PropsWithChildren<AriaButtonProps> & {
  /** The CSS className for the button element. */
  className?: string;
};

/**
 * CustomButton component that wraps the AriaButton component.
 * It allows for additional styling and functionality.
 *
 * All the props are directly passed to the AriaButton component props, except for the following which are handled internally before being passed:
 * - **className**: The CSS className for the button element.
 * - **children**: The content to display in the button.
 * // todo: complete with isDisabled, isFullWidth, isRounded, etc.
 *
 * The component also accepts all the props of the AriaButton component. Here is an example of the most important ones:
 * - **onPress**: Function to call when the button is pressed.
 * - **ref**: A ref to the react-aria Button.
 * // todo: maybe mention that "isDisabled" is not passed to the AriaButton component directly but handled internally first before being passed?
 *
 * https://react-spectrum.adobe.com/react-aria/Button.html
 */
export const CustomButton = ({ className, children, ...rest }: CustomButtonProps) => {
  const buttonClassName = classNames(styles['button'], className);

  return (
    // Pass props after spreading the rest of the props in order to keep control over the className.
    <AriaButton {...rest} className={buttonClassName}>
      {children}
    </AriaButton>
  );
};

// Todo: remove.
export const Test = () => {
  return (
    <CustomButton className="test" onPress={() => console.warn('Button pressed')}>
      {'aze'}
    </CustomButton>
  );
};
