import React from 'react';
import './styles.css';
import { StartButtonProps } from './types';

const LinkButton = (props: StartButtonProps) => {
  const { text, disabled, onClick } = props;

  return (
    <button
      disabled={!disabled}
      type="submit"
      onClick={onClick}
      className="linkButton"
    >
      {text}
    </button>
  );
};
export default LinkButton;
