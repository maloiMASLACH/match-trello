import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import ErrorBLock from '../../../blocks/errorBlock';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [passwordOne, setFirstPassword] = useState('');
  const [passwordTwo, setSecondPassword] = useState('');
  const [error, setError] = useState('');

  const isCorrect = passwordOne
    && passwordTwo
    && patterns.password.test(passwordOne)
    && patterns.password.test(passwordTwo);

  const onSubmit = () => {
    firebase
      .doPasswordUpdate(passwordTwo)
      .then(() => {
        navigate(welcome);
      })
      .catch(() => {
        setError('Incorrect data');
      });
  };

  return (
    <>
      <div
        className="input-field"
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
      {error ? <ErrorBLock errorText={error} /> : null}
      <Button
        text="change password"
        type="submit"
        disabled={!isCorrect}
        onClick={onSubmit}
      />
    </>
  );
};

export default PasswordReset;
