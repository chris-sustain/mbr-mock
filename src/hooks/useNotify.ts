import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { customNotify } from '@components/NotificationSystem/NotificationSystem';
import type { NotifySettings } from '@components/NotificationSystem/types';

export const useNotify = () => {
  const { t } = useTranslation();

  const notify = useCallback(
    (settings: NotifySettings) => customNotify({ ...settings, hookSettings: { t } }),
    [t]
  );
  return {
    notify
  };
};
