import React from 'react';
import { NavLink } from 'react-router-dom';
import { app } from '../../constants/roterLinks';
import './linkButton.css';

interface StartButtonProps{
  text: string;
  disabled: boolean
}

const LinkButton = function (props:StartButtonProps) {
  const { text, disabled } = props;
  console.log(disabled);
  return (
    <NavLink to={app} className={disabled ? 'linkButton' : 'linkButton disabled'}>
      <p>{text}</p>
    </NavLink>
  );
};
export default LinkButton;
