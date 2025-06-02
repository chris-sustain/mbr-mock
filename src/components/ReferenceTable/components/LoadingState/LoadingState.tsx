import { memo } from 'react';

import { CircularProgress } from '@src/components/CircularProgress';

import styles from './LoadingState.module.scss';

const TABLE_HEADER_HEIGHT = 50;
interface LoadingStateProps {
  height: number;
  width: number;
  colSpan: number;
}

export const LoadingState = memo<LoadingStateProps>(({ height, width, colSpan }) => {
  return (
    <tr className={styles.root}>
      <td
        colSpan={colSpan}
        style={{ padding: 0, height: height - TABLE_HEADER_HEIGHT, width: width }}>
        <div className={`${styles['empty-state-container']}`}>
          <CircularProgress />
        </div>
      </td>
    </tr>
  );
});
