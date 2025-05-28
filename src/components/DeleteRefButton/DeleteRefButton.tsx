import styles from './DeleteRefButton.module.scss';
import { CustomIcon } from '@components/CustomIcon';
import classNames from 'classnames';

interface DeleteRefButtonProps {
  rowSelection: Record<string, boolean>;
}

export const DeleteRefButton = ({ rowSelection }: DeleteRefButtonProps) => {
  const isDisabled = Object.keys(rowSelection).length === 0;
  return (
    <div className={classNames(styles['root'], { [styles['disabled']]: isDisabled })}>
      <button className={styles['button']} disabled={isDisabled}>
        <CustomIcon name="trash" />
      </button>
    </div>
  );
};
