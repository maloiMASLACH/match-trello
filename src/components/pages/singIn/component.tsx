import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../constants/patterns';
import { passForget, userPage } from '../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import InputBlock from '../../controls/input';
import Button from '../../controls/button';
import PasswordActionLink from '../../controls/passwordChangeLink/component';
import './styles.css';

const SingInForm: React.FC = () => {
  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = () => {
    if (
      inputMail
      && inputPassword
      && patterns.mail.test(inputMail)
      && patterns.password.test(inputPassword)
    ) {
      setCorrect(true);
    } else setCorrect(false);
  };

  const onSubmit = (firebase:Firebase) => {
    firebase
      .doSignInWithEmailAndPassword(inputMail, inputPassword)
      .then(() => {
        navigate(userPage);
      })
      .catch(() => {
        alert('Incorrect data');
      });
  };

  useEffect(() => {
    checkIsCorrect();
  });

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div
            className="input-field"
            onChange={() => {
              checkIsCorrect();
            }}
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
            disabled={isCorrect}
            onClick={() => onSubmit(firebase)}
          />
          <PasswordActionLink text="forget password?" link={passForget} />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default SingInForm;
