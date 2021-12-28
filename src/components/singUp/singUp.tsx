import React, { useRef, useState } from 'react';
import './singUp.css';
import InputBlock from '../input/input';
import LinkButton from '../linkButton/linkButton';

const SingUpForm:React.FC = function () {
  const inputMail = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = () => {
    if (inputMail.current?.value
  && inputName.current?.value
  && inputPassword.current?.value
  && inputPassword.current.value === confirmPassword.current?.value) {
      setCorrect(true);
    } else setCorrect(false);
  };

  return (
    <div
      className="input-field"
      onChange={() => checkIsCorrect()}
    >
      <InputBlock id="Login" parentRef={inputName} label="User Name (Login)" type="text" />
      <InputBlock id="Email" parentRef={inputMail} label="Your E-mail" type="email" />
      <InputBlock id="Password" parentRef={inputPassword} label="Password" type="password" />
      <InputBlock id="ConfirmPassword" parentRef={confirmPassword} label="Conform Password" type="password" />
      <LinkButton text="SING UP" disabled={isCorrect} />
    </div>
  );
};
export default SingUpForm;
