import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../input';
import LinkButton from '../../../linkButton';
import { CheckIsCorrectProps } from './types';

const PasswordReset: React.FC = () => {
  const [passwordOne, setFirstPassword] = useState('');
  const [passwordTwo, setSecondPassword] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    {
      password,
      confirm,
      setVisibly,
    }:CheckIsCorrectProps,
  ) => {
    if (password === confirm && patterns.password.test(password)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (
    password: string,
    nav: NavigateFunction,
    firebase: Firebase,
  ) => {
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        nav(welcome);
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
                {
                  password: passwordOne,
                  confirm: passwordTwo,
                  setVisibly: setCorrect,
                },
              );
            }}
          >
            <InputBlock
              id="oldPassword"
              value={passwordOne}
              setValue={setFirstPassword}
              label="New Password"
              type="password"
            />
            <InputBlock
              id="newPassword"
              value={passwordTwo}
              setValue={setSecondPassword}
              label="Confirm Password"
              type="password"
            />
          </div>
          <LinkButton
            text="CHANGE PASSWORD"
            disabled={isCorrect}
            onClick={() => onSubmit(passwordOne, navigate, firebase)}
          />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default PasswordReset;
