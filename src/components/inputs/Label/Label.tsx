import type { ReactNode } from 'react';
import { Label as ReactAriaLabel } from 'react-aria-components';
import classNames from 'classnames';
import styles from './styles.module.scss';

export default function Label({
  isRequired = false,
  className,
  children
}: {
  isRequired?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  console.log(children);
  return (
    <div className={classNames(styles.label, className)}>
      <ReactAriaLabel>{children}</ReactAriaLabel>
      {isRequired && <span className={styles.star}>*</span>}
    </div>
  );
}