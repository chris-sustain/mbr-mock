import toast from 'react-hot-toast';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
// todo import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './CustomNotification.module.scss';

export const CustomNotification = ({
  type,
  title,
  closable,
  icon,
  actionCallback,
  actionBtnLabel,
  thisToast,
  children
}: {
  type: 'info' | 'critical' | 'promise';
  title?: string;
  closable?: boolean;
  icon?: React.ReactNode;
  actionCallback?: () => void;
  actionBtnLabel?: string;
  thisToast: { id: string; visible: boolean };
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const toastClassName = classNames(styles['custom-notification'], styles[type], {
    [styles['animate-enter']]: thisToast.visible,
    [styles['animate-leave']]: !thisToast.visible
  });

  return (
    <div
      className={styles['custom-notification-container']}
      data-testid="toast-notification"
      data-state={type}>
      <div className={toastClassName}>
        {icon && <div className={styles['icon']}>{icon}</div>}
        <div className={styles['content-container']}>
          {title && <div className={styles['title']}>{title}</div>}

          <div className={styles['content']}>{children}</div>

          {(actionCallback !== undefined || closable === true) && (
            <div className={styles['action-buttons']}>
              {closable && (
                <button type="button" onClick={() => toast.dismiss(thisToast.id)}>
                  {t('common.close')}
                </button>
              )}
              {actionCallback !== undefined && (
                <button
                  type="button"
                  onClick={() => {
                    actionCallback();
                    toast.dismiss(thisToast.id);
                  }}>
                  {actionBtnLabel}
                </button>
              )}
            </div>
          )}
        </div>
        {closable && (
          <div
            data-testid="toast-close-icon"
            className={styles['close-icon-container']}
            onClick={() => toast.dismiss(thisToast.id)}>
            {/* <CloseRoundedIcon /> */}
            {/* TODO: add icon */}
          </div>
        )}
      </div>
    </div>
  );
};
