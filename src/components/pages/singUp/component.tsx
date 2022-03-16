import React, { useContext, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import { FirebaseContext } from '../../../utils/fireBase';
import patterns from '../../../constants/patterns';
import { FirstDesk } from '../../../constants/voidObjects';
import { userPage } from '../../../constants/routerLinks';
import ErrorBLock from '../../blocks/errorBlock';

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

  const onSubmit = () => {
    firebase
      .doCreateUserWithEmailAndPassword(inputMail, inputPassword)
      .then((newUser) => firebase.user(newUser.user!.uid).set({
        name: inputName,
        mail: inputMail,
        uid: `/${newUser.user!.uid}`,
        desks: { FirstDesk },
      }))
      .then(() => navigate(userPage))
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
          label="User Name (Login)"
          type="text"
          placeholder="Use 6-15 letters"
        />
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label="Your E-mail"
          type="email"
        />
        <InputBlock
          id="Password"
          value={inputPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="Use 6-15 letters or numbers"
        />
        <InputBlock
          id="ConfirmPassword"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
          }}
          label="Conform Password"
          type="password"
          placeholder="Use 6-15 letters or numbers"
        />
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <Button
        text="SING UP"
        disabled={!checkIsCorrect}
        type="submit"
        onClick={onSubmit}
      />
    </>
  );
};

export default SingUpForm;
