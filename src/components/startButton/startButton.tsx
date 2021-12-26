import React from 'react';
import { NavLink } from 'react-router-dom';
import './startButton.css';

interface StartButtonProps{
  text: string
}

const StartButton = function (props:StartButtonProps) {
  const { text } = props;
  return (
    <NavLink to="/" className="startButton">
      <p>{text}</p>
    </NavLink>

  );
};
export default StartButton;
