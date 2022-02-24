import React, { useState } from 'react';
import './styles.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import InputBlock from '../../input';
import LinkButton from '../../linkButton';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import patterns from '../../../constants/patterns';
import { welcome } from '../../../constants/routerLinks';
import { CheckIsCorrectProps } from './types';

const SingUpForm: React.FC = () => {
  const [inputMail, setInputMail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = ({
    mail, name, password, confirmPas, setVisibly,
  }:CheckIsCorrectProps) => {
    if (
      mail
      && name
      && password
      && password === confirmPas
      && patterns.mail.test(mail)
      && patterns.name.test(name)
      && patterns.password.test(password)
    ) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (
    name: string,
    mail: string,
    pass: string,
    firebase: Firebase,
    nav: NavigateFunction,
  ) => {
    firebase
      .doCreateUserWithEmailAndPassword(mail, pass)
      .then((newUser) => firebase.user(newUser.user!.uid).set({
        name,
        mail,
        uid: `/${newUser.user!.uid}`,
        decks: {
          First_Deck: {
            colons: {
              First_Colon: {
                tasks: {
                  task: {
                    taskName: 'task',
                    date: 'tomorrow',
                    completed: false,
                    id: 1,
                  },
                },
                id: 1,
                colonName: 'First Colon',
              },
            },
            id: 1,
          },
        },
      }))
      .then(() => nav(welcome))
      .catch(() => {
        alert('Incorrect data');
      });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div
            className="input-field"
            onChange={() => checkIsCorrect(
              {
                mail: inputMail,
                name: inputName,
                password: inputPassword,
                confirmPas: confirmPassword,
                setVisibly: setCorrect,
              },
            )}
          >
            <InputBlock
              id="Login"
              value={inputName}
              setValue={setInputName}
              label="User Name (Login)"
              type="text"
            />
            <InputBlock
              id="Email"
              value={inputMail}
              setValue={setInputMail}
              label="Your E-mail"
              type="email"
            />
            <InputBlock
              id="Password"
              value={inputPassword}
              setValue={setInputPassword}
              label="Password"
              type="password"
            />
            <InputBlock
              id="ConfirmPassword"
              value={confirmPassword}
              setValue={setConfirmPassword}
              label="Conform Password"
              type="password"
            />
          </div>
          <LinkButton
            text="SING UP"
            disabled={isCorrect}
            onClick={() => onSubmit(
              inputName,
              inputMail,
              inputPassword,
              firebase,
              navigate,
            )}
          />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};

export default SingUpForm;
