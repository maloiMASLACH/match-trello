/* eslint-disable react/button-has-type */
import React from 'react';
import clsx from 'clsx';
import './styles.css';
import '../../../App.css';
import { StartButtonProps } from '../../../types';

const Button = (props: StartButtonProps) => {
  const {
    className, text, ...rest
  } = props;

  return (
    <button
      {...rest}
      className={clsx('linkButton', className)}
    >
      {text}
    </button>
  );
};

export default Button;
