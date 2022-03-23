import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns, { checkPasswordInputs } from '../../../../utils/patterns';
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
    && patterns.password.test(passwordTwo)
    && passwordOne === passwordTwo;

  let passwordsDontSameMessage = '';

  if (
    patterns.password.test(passwordOne)
    && patterns.password.test(passwordTwo)
    && passwordOne !== passwordTwo
  ) {
    passwordsDontSameMessage = 'Confirm password should match first password';
  } else passwordsDontSameMessage = '';

  const onSubmit = () => {
    firebase
      .doPasswordUpdate(passwordTwo)
      .then(() => {
        navigate(welcome);
      })
      .catch((e) => {
        setError(e.message);
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
          placeholder="Use 6-15 letters or numbers"
          validation={checkPasswordInputs}
        />
        <InputBlock
          id="newPassword"
          value={passwordTwo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPassword(e.target.value)}
          label="Confirm Password"
          type="password"
          validation={checkPasswordInputs}
        />
        <p className="passwordsDontSameMessage">{passwordsDontSameMessage}</p>
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
