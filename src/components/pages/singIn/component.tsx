import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../constants/patterns';
import { passForget, userPage } from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import PasswordActionLink from '../../controls/passwordChangeLink/component';
import './styles.css';

const SingInForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

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
      .catch(() => {
        setInputMail('Incorrect data');
        setInputPassword('');
      });
  };

  return (
    <>
      <div
        className="input-field"
      >
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label="E-Mail"
          type="email"
        />
        <InputBlock
          id="Password"
          value={inputPassword}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value)}
          label="Password"
          type="password"
        />
      </div>
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
