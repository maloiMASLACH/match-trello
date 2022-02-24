import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import InputBlock from '../../input';
import LinkButton from '../../linkButton';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import patterns from '../../../constants/patterns';
import { welcome } from '../../../constants/routerLinks';

const SingUpForm: React.FC = () => {
  const [inputMail, setInputMail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = () => {
    if (
      inputMail
      && inputName
      && inputPassword
      && inputPassword === confirmPassword
      && patterns.mail.test(inputMail)
      && patterns.name.test(inputName)
      && patterns.password.test(inputPassword)
    ) {
      setCorrect(true);
    } else setCorrect(false);
  };

  const onSubmit = (firebase:Firebase) => {
    firebase
      .doCreateUserWithEmailAndPassword(inputMail, inputPassword)
      .then((newUser) => firebase.user(newUser.user!.uid).set({
        inputName,
        inputMail,
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
      .then(() => navigate(welcome))
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
            onChange={() => checkIsCorrect()}
          >
            <InputBlock
              id="Login"
              value={inputName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
              label="User Name (Login)"
              type="text"
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
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
              ) => setInputPassword(e.target.value)}
              label="Password"
              type="password"
            />
            <InputBlock
              id="ConfirmPassword"
              value={confirmPassword}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
              ) => setConfirmPassword(e.target.value)}
              label="Conform Password"
              type="password"
            />
          </div>
          <LinkButton
            text="SING UP"
            disabled={isCorrect}
            onClick={() => onSubmit(firebase)}
          />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};

export default SingUpForm;
