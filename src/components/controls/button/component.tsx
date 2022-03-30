/* eslint-disable react/button-has-type */
import React from 'react';
import clsx from 'clsx';
import './styles.css';
import '../../../App.css';
import { StartButtonProps } from '../../../types/button';

const Button = (props: StartButtonProps) => {
  const {
    className, text, ...rest
  } = props;

  return (
    <button
      {...rest}
      onClick={rest.handleClick}
      className={clsx('linkButton', className)}
    >
      {text}
    </button>
  );
};

export default Button;
