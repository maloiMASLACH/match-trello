import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterLinks, Labels, Placeholders } from '../../../constants';
import {
  FirebaseContext, patterns, validateEmail, validatePassword,
} from '../../../utils';
import ErrorBLock from '../../blocks/errorBlock';
import { InputBlock, PasswordActionLink, LinkButton } from '../../controls';
import './styles.css';

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
        navigate(RouterLinks.UserPage);
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
          label={Labels.Email}
          type="email"
          placeholder={Placeholders.Mail}
          validation={validateEmail}
        />
        <InputBlock
          id="Password"
          value={inputPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value)}
          label={Labels.Password}
          type="password"
          placeholder={Placeholders.Password}
          validation={validatePassword}
        />
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <LinkButton
        text="SING IN"
        type="submit"
        disabled={!isCorrect}
        onClick={onSubmit}
      />
      <PasswordActionLink
        text="forget password?"
        link={RouterLinks.PassForget}
      />
    </>
  );
};

export default SingInForm;
