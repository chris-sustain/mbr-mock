import type { ToastType } from './types';
export const getParsedProps = ({
  type,
  title,
  duration,
  closable,
  icon,
  actionCallback,
  actionBtnLabel,
  t
}: {
  type: ToastType;
  title?: string;
  duration?: number;
  closable?: boolean;
  icon?: React.ReactNode;
  actionCallback?: () => void;
  actionBtnLabel?: string;

  t: (_: string) => string;
}) => {
  console.warn(t);
  const libraryToastDefaultProps = {
    info: {
      duration: 5000
    },
    critical: {
      duration: Infinity
    },
    promise: {
      duration: 0
    }
  };

  const customNotificationDefaultProps = {
    info: {
      title: t('common.NotificationSystem.info.defaultTitle'),
      closable: false
      // icon: <CheckCircleRoundedIcon fontSize="small" sx={{ color: '#66C397' }} />
      // TODO: add icon
    },
    critical: {
      title: t('common.NotificationSystem.critical.defaultTitle'),
      closable: true
      // icon: <InfoRoundedIcon fontSize="small" sx={{ color: '#CD3546' }} />
      // TODO: add icon
    },
    promise: {
      title: t('common.NotificationSystem.promise.defaultTitle'),
      closable: true
    }
  };

  let libraryToastProps = libraryToastDefaultProps[type];
  libraryToastProps = {
    ...libraryToastProps,
    ...(duration !== undefined && { duration })
  };

  let customNotificationProps = customNotificationDefaultProps[type];
  customNotificationProps = {
    ...customNotificationProps,
    ...(title !== undefined && { title }),
    ...(closable !== undefined && { closable }),
    ...(icon !== undefined && { icon }),
    type: type,
    actionCallback: actionCallback,
    actionBtnLabel:
      actionBtnLabel !== undefined ? actionBtnLabel : t('common.NotificationSystem.ActionBtnLabel')
  };

  if (
    type !== 'promise' &&
    libraryToastProps.duration === Infinity &&
    customNotificationProps.closable === false
  ) {
    console.warn(
      'A non-closable notification with infinite duration was requested. This is not allowed. The notification will be closable.'
    );
    customNotificationProps.closable = true;
  }

  return {
    libraryToastProps,
    customNotificationProps
  };
};
