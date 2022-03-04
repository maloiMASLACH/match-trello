import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import { CheckIsCorrectProps } from '../../../../types/passwordReset';

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
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFirstPassword(e.target.value)}
              label="New Password"
              type="password"
            />
            <InputBlock
              id="newPassword"
              value={passwordTwo}
              onChange={(
                e:React.ChangeEvent<HTMLInputElement>,
              ) => setSecondPassword(e.target.value)}
              label="Confirm Password"
              type="password"
            />
          </div>
          <Button
            text="CHANGE PASSWORD"
            type="submit"
            disabled={isCorrect}
            onClick={() => onSubmit(passwordOne, navigate, firebase!)}
          />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default PasswordReset;
