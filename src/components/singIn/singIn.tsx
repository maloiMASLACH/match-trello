import React, { useRef } from 'react';
import InputBlock from '../input/input';
import LinkButton from '../linkButton/linkButton';
import './singIn.css';

const SingInForm:React.FC = function () {
  const inputName = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  return (
    <div className="input-field">
      <InputBlock id="Email" parentRef={inputName} label="E-Mail" type="email" />
      <InputBlock id="Password" parentRef={inputPassword} label="Password" type="password" />
      <LinkButton text="SING IN" disabled />
    </div>
  );
};
export default SingInForm;
