import type { ReactNode } from 'react';
import { Label as ReactAriaLabel } from 'react-aria-components';
import classNames from 'classnames';

import styles from './Label.module.scss';

export function Label({
  isRequired = false,
  className,
  children
}: {
  isRequired?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={classNames(styles.label, className)}>
      <ReactAriaLabel>{children}</ReactAriaLabel>
      {isRequired && <span className={styles.star}>*</span>}
    </div>
  );
}
