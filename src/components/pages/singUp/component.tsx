import React, { useContext, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import { FirebaseContext } from '../../../utils/fireBase';
import patterns, {
  validateEmail,
  validatePassword,
  validateUserName,
} from '../../../utils/patterns';
import RouterLinks from '../../../constants/routerLinks';
import ErrorBLock from '../../blocks/errorBlock';
import Labels from '../../../constants/labels';
import Placeholders from '../../../constants/placeholders';

const SingUpForm: React.FC = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const checkIsCorrect = inputMail
    && inputName
    && inputPassword
    && inputPassword === confirmPassword
    && patterns.mail.test(inputMail)
    && patterns.name.test(inputName)
    && patterns.password.test(inputPassword);

  let passwordsDontSameMessage = '';

  if (
    patterns.password.test(inputPassword)
    && patterns.password.test(confirmPassword)
    && inputPassword !== confirmPassword
  ) {
    passwordsDontSameMessage = 'Confirm password should match first password';
  } else passwordsDontSameMessage = '';

  const onSubmit = () => {
    firebase
      .doCreateUserWithEmailAndPassword(inputMail, inputPassword)
      .then((newUser) => firebase.user(newUser.user!.uid).set({
        name: inputName,
        mail: inputMail,
        uid: `/${newUser.user!.uid}`,
        desks: {},
      }))
      .then(() => firebase.auth.currentUser?.sendEmailVerification())
      .then(() => navigate(RouterLinks.UserPage))
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      <div className="input-field">
        <InputBlock
          id="Login"
          value={inputName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
          label={Labels.Name}
          type="text"
          placeholder={Placeholders.Login}
          validation={validateUserName}
        />
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
        <InputBlock
          id="ConfirmPassword"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
          }}
          label={Labels.Confirm}
          type="password"
          placeholder={Placeholders.Password}
          validation={validatePassword}
        />
        <p className="passwordsDontSameMessage">{passwordsDontSameMessage}</p>
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <Button
        text="SING UP"
        type="submit"
        disabled={!checkIsCorrect}
        onClick={onSubmit}
      />
    </>
  );
};

export default SingUpForm;
