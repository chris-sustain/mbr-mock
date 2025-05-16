import { Tooltip } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import styles from './FieldWrapper.module.scss';

const FieldWrapper = ({
  title = '',
  description = '',
  helper = '',
  required = false,
  showRequiredAsterisk = false,
  errorMessage = '',
  wrapperInlineStyle = {},
  children
}) => {
  return (
    <div className={styles['root']} style={wrapperInlineStyle}>
      {title !== '' && (
        <div className={styles['top']}>
          <span className={styles['title']}>
            {title}
            {(required || showRequiredAsterisk) && (
              <span className={styles['required-asterisk']}>*</span>
            )}
          </span>

          {helper !== '' && (
            <Tooltip
              title={<p className={styles['helper-text']}>{helper}</p>}
              enterDelay={300}
              placement="right"
              className={styles['helper-icon']}>
              <HelpOutlineRoundedIcon sx={{ color: '#636363' }} />
            </Tooltip>
          )}
          {description !== '' && <div className={styles['description']}>{description}</div>}
        </div>
      )}
      {children}
      {errorMessage !== '' && <div className={styles['error-message']}>{errorMessage}</div>}
    </div>
  );
};

export default FieldWrapper;
