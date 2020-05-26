import React from 'react';
import styles from './error.module.scss';
interface ErrorProps {
  details?: string;
}

const AppError = ({ details }: ErrorProps) => {
  return (<div className={styles.error}>
    hiiiiiiiiiiiiiiiiiiiiiii
  </div>);
}
export default AppError;