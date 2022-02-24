import React from 'react';
import './linkButton.css';
import { StartButtonProps } from './linkButtonTypes';

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
