import React, { useRef } from 'react';
import './singUp.css';
import InputBlock from '../input/input';
import StartButton from '../startButton/startButton';

const SingUpForm:React.FC = function () {
  const inputName = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  return (
    <div className="input-field">
      <InputBlock id="Login" ref={inputName} label="User Name (Login)" type="text" />
      <InputBlock id="Password" ref={inputPassword} label="Password" type="password" />
      <InputBlock id="ConfirmPassword" ref={confirmPassword} label="Conform Password" type="password" />
      <StartButton text="SING UP" />
    </div>
  );
};
export default SingUpForm;
