import { memo } from 'react';
import styles from './LoadingState.module.scss';

import { CircularProgress } from '@src/components/CircularProgress';
const TABLE_HEADER_HEIGHT = 50;
interface LoadingStateProps {
  height: number;
  colSpan: number;
}

export const LoadingState = memo<LoadingStateProps>(({ height, colSpan }) => {
  return (
    <tr className={styles.root}>
      <td colSpan={colSpan} style={{ padding: 0, height: height - TABLE_HEADER_HEIGHT }}>
        <div className={`${styles['empty-state-container']}`}>
          <CircularProgress />
        </div>
      </td>
    </tr>
  );
});
