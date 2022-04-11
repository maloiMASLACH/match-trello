import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns, {
  validateEmail,
  validatePassword,
} from '../../../utils/patterns';
import RouterLinks from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import PasswordActionLink from '../../controls/passwordChangeLink/component';
import './styles.css';
import ErrorBLock from '../../blocks/errorBlock';
import Labels from '../../../constants/labels';
import Placeholders from '../../../constants/placeholders';

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
      <Button
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
