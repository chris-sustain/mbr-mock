import { Trans } from 'react-i18next';

import { CustomIcon } from '@src/components/CustomIcon/CustomIcon';

import styles from './EmptyState.module.scss';

const TABLE_HEADER_HEIGHT = 50;
interface EmptyStateProps {
  height: number;
  width: number;
  colSpan: number;
}

export const EmptyState = ({ height, width, colSpan }: EmptyStateProps) => {
  return (
    <tr className={styles.root}>
      <td
        colSpan={colSpan}
        style={{ padding: 0, height: height - TABLE_HEADER_HEIGHT, width: width }}>
        <div className={`${styles['empty-state-container']}`}>
          <Trans i18nKey="common.emptyState.title" />
          <CustomIcon name="empty-state" size={160} />
        </div>
      </td>
    </tr>
  );
};
