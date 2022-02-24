import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../input';
import LinkButton from '../../../linkButton';
import { OnSubmitProps } from './types';

const PasswordForget: React.FC = () => {
  const [inputMail, setInputMail] = useState('');

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    mail: string,
    setVisibly: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (mail && patterns.mail.test(mail)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = ({ mail, nav, firebase }: OnSubmitProps) => {
    firebase
      .doPasswordReset(mail)
      .then(() => {
        nav(welcome);
      })
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
            onChange={() => {
              checkIsCorrect(inputMail, setCorrect);
            }}
          >
            <InputBlock
              id="Email"
              value={inputMail}
              setValue={setInputMail}
              label="E-Mail"
              type="email"
            />
          </div>
          <LinkButton
            text="RESET PASSWORD"
            disabled={isCorrect}
            onClick={() => onSubmit({ mail: inputMail, nav: navigate, firebase })}
          />
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
export default PasswordForget;
