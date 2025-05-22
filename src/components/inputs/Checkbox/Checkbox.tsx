import classNames from 'classnames';
import styles from './Checkbox.module.scss';
import {
  Checkbox as CheckboxAria,
  type CheckboxProps as CheckboxPropsAria
} from 'react-aria-components';

type CheckBoxProps = Omit<CheckboxPropsAria, 'children'> & {
  children?: React.ReactNode;
  variant?: 'default' | 'secondary';
};

export const Checkbox: React.FC<CheckBoxProps> = ({ children, variant = 'default', ...props }) => {
  const rootClassname = classNames(styles['root'], styles[variant]);
  return (
    <CheckboxAria {...props} className={rootClassname}>
      {({ isIndeterminate }) => (
        <>
          <div className={`${styles['checkbox']}`}>
            <svg viewBox="0 0 16 18" aria-hidden="true">
              {isIndeterminate ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none">
                  <path
                    d="M12.6665 8.17407H3.33317C3.15636 8.17407 2.98679 8.24431 2.86177 8.36933C2.73674 8.49436 2.6665 8.66393 2.6665 8.84074C2.6665 9.01755 2.73674 9.18712 2.86177 9.31214C2.98679 9.43717 3.15636 9.50741 3.33317 9.50741H12.6665C12.8433 9.50741 13.0129 9.43717 13.1379 9.31214C13.2629 9.18712 13.3332 9.01755 13.3332 8.84074C13.3332 8.66393 13.2629 8.49436 13.1379 8.36933C13.0129 8.24431 12.8433 8.17407 12.6665 8.17407Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>

          {children}
        </>
      )}
    </CheckboxAria>
  );
};
