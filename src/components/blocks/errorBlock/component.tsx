import React from 'react';
import { ErrorBLockProps } from '../../../types/errorBlock';
import './styles.css';

const ErrorBLock = (props: ErrorBLockProps) => {
  const { errorText } = props;

  return (
    <div className="errorBlock">
      <p>{errorText.split(':')[1].split('.')[0]}</p>
    </div>
  );
};

export default ErrorBLock;
