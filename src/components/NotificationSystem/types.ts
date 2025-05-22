export type ToastType = 'info' | 'critical' | 'promise';

export interface NotifySettings {
  component?: string;
  type?: ToastType;
  title?: string;
  content?: React.ReactNode;
  duration?: number;
  closable?: boolean;
  icon?: React.ReactNode;
  actionCallback?: () => void;
  actionBtnLabel?: string;
}
