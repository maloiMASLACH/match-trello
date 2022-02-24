import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../constants/patterns';
import { passForget, userPage } from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../input';
import LinkButton from '../../linkButton';
import PasswordActionLink from '../../passwordChangeLink/component';
import './styles.css';
import { CheckIsCorrectProps, OnSubmitProps } from './types';

const SingInForm: React.FC = () => {
  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = ({
    mail,
    password,
    setVisibly,
  }: CheckIsCorrectProps) => {
    if (
      mail
      && password
      && patterns.mail.test(mail)
      && patterns.password.test(password)
    ) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = ({
    mail, password, nav, firebase,
  }: OnSubmitProps) => {
    firebase
      .doSignInWithEmailAndPassword(mail, password)
      .then(() => {
        nav(userPage);
      })
      .catch(() => {
        alert('Incorrect data');
      });
  };

  useEffect(() => {
    checkIsCorrect({
      mail: inputMail,
      password: inputPassword,
      setVisibly: setCorrect,
    });
  });

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div
            className="input-field"
            onChange={() => {
              checkIsCorrect({
                mail: inputMail,
                password: inputPassword,
                setVisibly: setCorrect,
              });
            }}
          >
            <InputBlock
              id="Email"
              value={inputMail}
              setValue={setInputMail}
              label="E-Mail"
              type="email"
            />
            <InputBlock
              id="Password"
              value={inputPassword}
              setValue={setInputPassword}
              label="Password"
              type="password"
            />
          </div>
          <LinkButton
            text="SING IN"
            disabled={isCorrect}
            onClick={() => onSubmit({
              mail: inputMail,
              password: inputPassword,
              nav: navigate,
              firebase,
            })}
          />
          <PasswordActionLink text="forget password?" link={passForget} />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default SingInForm;
