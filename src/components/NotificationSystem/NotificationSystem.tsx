import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import type { NotifySettings } from './types';

import CustomNotification from './components/CustomNotification/CustomNotification';

import { getParsedProps } from './utils';

type CustomNotificationProps = {
  type: 'info' | 'critical' | 'promise';
  title?: string;
  closable?: boolean;
  icon?: React.ReactNode;
  actionCallback?: () => void;
  actionBtnLabel?: string;
};

/**
 * @returns The container for the notifications. It should be placed at the root of the application.
 */
const NotificationContainer = () => {
  return createPortal(<Toaster position="bottom-right" gutter={0} />, document.body);
};

const getNotificationComponent = (
  component: string,
  thisToast: { id: string; visible: boolean },
  customNotificationProps: CustomNotificationProps,
  content: React.ReactNode
) => {
  switch (component) {
    default:
      return (
        <CustomNotification {...customNotificationProps} thisToast={thisToast}>
          {content}
        </CustomNotification>
      );
  }
};

/**
 * Show a notification, 'info' type by default. Each type of notification has some default values so you can just pass the content and the type.
 * @param {Object} settings Notification settings
 * @param {String} [settings.type="info"] The type of the notification.
 * @param {String} [settings.title] The title of the notification.
 * @param {String | JSX.Element} [settings.content] The content of the notification.
 * @param {Number} [settings.duration] The duration of the notification in milliseconds.
 * @param {Boolean} [settings.closable] Whether the notification has a close button or not.
 * @param {String | JSX.Element} [settings.icon] Icon to be displayed in the notification.
 * @param {Function} [settings.actionCallback] If provided, a button will be displayed in the notification that will call this function when clicked.
 * @param {String} [settings.actionBtnLabel] The label of the action button. Uses 'common.NotificationSystem.Action' from i18n by default.
 * @param {Object} [hookSettings] The settings object from the useTranslation hook.
 */
const customNotify = ({
  component = 'default',
  type = 'info',
  title,
  content,
  duration,
  closable,
  icon,
  actionCallback,
  actionBtnLabel,
  hookSettings
}: NotifySettings & { hookSettings?: { t: (_: string) => string } }) => {
  const { t } = hookSettings ?? { t: (_: string) => _ };
  const { libraryToastProps, customNotificationProps } = getParsedProps({
    type,
    title,
    duration,
    closable,
    icon,
    actionCallback,
    actionBtnLabel,
    t
  });

  toast.custom(
    (thisToast) => getNotificationComponent(component, thisToast, customNotificationProps, content),
    {
      ...libraryToastProps
    }
  );
};

export { NotificationContainer, customNotify };
