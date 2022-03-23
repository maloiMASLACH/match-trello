import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns, { validateEmail, validatePassword } from '../../../utils/patterns';
import { passForget, userPage } from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import PasswordActionLink from '../../controls/passwordChangeLink/component';
import './styles.css';
import ErrorBLock from '../../blocks/errorBlock';

const SingInForm: React.FC = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');

  const isCorrect = inputMail
    && inputPassword
    && patterns.mail.test(inputMail)
    && patterns.password.test(inputPassword);

  const onSubmit = () => {
    firebase
      .doSignInWithEmailAndPassword(inputMail, inputPassword)
      .then(() => {
        navigate(userPage);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      <div className="input-field">
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label="E-Mail"
          type="email"
          validation={validateEmail}
        />
        <InputBlock
          id="Password"
          value={inputPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="Use 6-15 letters or numbers"
          validation={validatePassword}
        />
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <Button
        text="SING IN"
        disabled={!isCorrect}
        type="submit"
        onClick={onSubmit}
      />
      <PasswordActionLink text="forget password?" link={passForget} />
    </>
  );
};

export default SingInForm;
