import React, { useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import { CheckIsCorrectProps } from '../../../../types/passwordReset';

const PasswordReset: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [passwordOne, setFirstPassword] = useState('');
  const [passwordTwo, setSecondPassword] = useState('');
  const [isCorrect, setCorrect] = useState(Boolean);

  const navigate = useNavigate();

  const handleChecked = () => {
    setCorrect((prevState) => !prevState);
  };

  const checkIsCorrect = ({ password, confirm }: CheckIsCorrectProps) => {
    if (password === confirm && patterns.password.test(password)) {
      handleChecked();
    } else handleChecked();
  };

  const onSubmit = (password: string, nav: NavigateFunction) => {
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        nav(welcome);
      })
      .catch(() => {
        setFirstPassword('Incorrect data');
        setSecondPassword('');
      });
  };

  return (
    <>
      <div
        className="input-field"
        onChange={() => {
          checkIsCorrect({
            password: passwordOne,
            confirm: passwordTwo,
          });
        }}
      >
        <InputBlock
          id="oldPassword"
          value={passwordOne}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstPassword(e.target.value)}
          label="New Password"
          type="password"
        />
        <InputBlock
          id="newPassword"
          value={passwordTwo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPassword(e.target.value)}
          label="Confirm Password"
          type="password"
        />
      </div>
      <Button
        text="CHANGE PASSWORD"
        type="submit"
        disabled={isCorrect}
        onClick={() => onSubmit(passwordOne, navigate)}
      />
    </>
  );
};
export default PasswordReset;
