import React from 'react';
import styles from './error.module.scss';
interface ErrorProps {
  details?: string;
}

const AppError = ({ details }: ErrorProps) => {
  return (<div className={styles.error}>
    Error!
    <br/>
    please check console log for more details.
  </div>);
}
export default AppError;