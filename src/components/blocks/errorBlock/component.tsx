import React from 'react';
import { ErrorBLockProps } from '../../../types/errorBlock';
import './styles.css';

const ErrorBLock = (props: ErrorBLockProps) => {
  const { errorText } = props;

  return (
    <div className="errorBlock">
      <p>{errorText}</p>
    </div>
  );
};

export default ErrorBLock;
