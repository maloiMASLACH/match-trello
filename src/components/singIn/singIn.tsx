import React, { useRef } from 'react';
import InputBlock from '../input/input';
import './singIn.css';

const SingInForm:React.FC = function () {
  const inputName = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  return (
    <div className="input-field">
      <InputBlock id="Login" ref={inputName} label="User Name (Login)" type="text" />
      <InputBlock id="Password" ref={inputPassword} label="Password" type="password" />
    </div>
  );
};
export default SingInForm;
