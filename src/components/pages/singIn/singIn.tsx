import React, { useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../constants/patterns';
import { passForget, userPage } from '../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../input/input';
import LinkButton from '../../linkButton/linkButton';
import PasswordActionLink from '../../passwordChangeLink/passwordChangeLink';
import './singIn.css';

const SingInForm: React.FC = () => {
  const inputMail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    mail: string,
    password: string,
    setVisibly: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (
      mail
      && password
      && patterns.mail.test(mail)
      && patterns.password.test(password)
    ) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (
    mail: string,
    password: string,
    nav: NavigateFunction,
    firebase: Firebase,
  ) => {
    firebase
      .doSignInWithEmailAndPassword(mail, password)
      .then(() => {
        nav(userPage);
      })
      .catch(() => {
        alert('Incorrect data');
      });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div
            className="input-field"
            onChange={() => {
              checkIsCorrect(
                inputMail.current!.value,
                inputPassword.current!.value,
                setCorrect,
              );
            }}
          >
            <InputBlock
              id="Email"
              parentRef={inputMail}
              label="E-Mail"
              type="email"
            />
            <InputBlock
              id="Password"
              parentRef={inputPassword}
              label="Password"
              type="password"
            />
          </div>
          <LinkButton
            text="SING IN"
            disabled={isCorrect}
            onClick={() => onSubmit(
              inputMail.current!.value,
              inputPassword.current!.value,
              navigate,
              firebase,
            )}
          />
          <PasswordActionLink text="forget password?" link={passForget} />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default SingInForm;
