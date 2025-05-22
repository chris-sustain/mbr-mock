import styles from './EmptyState.module.scss';
import { Trans } from 'react-i18next';
import { CustomIcon } from '@src/components/CustomIcon/CustomIcon';
const TABLE_HEADER_HEIGHT = 50;
type EmptyStateProps = {
  height: number;
  colSpan: number;
};

export const EmptyState = ({ height, colSpan }: EmptyStateProps) => {
  return (
    <tr className={styles.root}>
      <td colSpan={colSpan} style={{ padding: 0, height: height - TABLE_HEADER_HEIGHT }}>
        <div className={`${styles['empty-state-container']}`}>
          <Trans i18nKey="common.emptyState.title" />
          <CustomIcon name="empty-state" size={160} />
        </div>
      </td>
    </tr>
  );
};
