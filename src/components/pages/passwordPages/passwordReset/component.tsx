import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterLinks, Labels, Placeholders } from '../../../../constants';
import { FirebaseContext, patterns, validatePassword } from '../../../../utils';
import ErrorBLock from '../../../blocks/errorBlock';
import { InputBlock, LinkButton } from '../../../controls';

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
        navigate(RouterLinks.Welcome);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      <div className="input-field">
        <InputBlock
          id="oldPassword"
          value={passwordOne}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstPassword(e.target.value)}
          label={Labels.NewPassword}
          type="password"
          placeholder={Placeholders.Password}
          validation={validatePassword}
        />
        <InputBlock
          id="newPassword"
          value={passwordTwo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPassword(e.target.value)}
          label={Labels.Confirm}
          type="password"
          validation={validatePassword}
        />
        <p className="passwordsDontSameMessage">{passwordsDontSameMessage}</p>
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <LinkButton
        text="change password"
        type="submit"
        disabled={!isCorrect}
        onClick={onSubmit}
      />
    </>
  );
};

export default PasswordReset;
