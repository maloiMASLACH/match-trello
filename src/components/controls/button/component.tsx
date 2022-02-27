import React from 'react';
import clsx from 'clsx';
import './styles.css';
import '../../../App.css';
import { StartButtonProps } from '../../../types/button';

const Button = (props: StartButtonProps) => {
  const {
    className, text, disabled, ...rest
  } = props;

  return (
    <button
      {...rest}
      disabled={!disabled}
      type="submit"
      className={clsx('linkButton', className)}
    >
      {text}
    </button>
  );
};
export default Button;
