import React from 'react';
import './linkButton.css';

interface StartButtonProps{
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const LinkButton = function (props:StartButtonProps) {
  const {
    text, disabled, onClick,
  } = props;
  return (
    <button disabled={!disabled} type="submit" onClick={onClick} className="linkButton">
      {text}
    </button>
  );
};
export default LinkButton;
