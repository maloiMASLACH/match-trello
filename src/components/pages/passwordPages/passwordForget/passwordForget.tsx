import React, { useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../input/input';
import LinkButton from '../../../linkButton/linkButton';

const PasswordForget:React.FC = function () {
  const inputMail = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    mail:string,
    setVisibly:React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (mail && patterns.mail.test(mail)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (
    mail:string,
    nav: NavigateFunction,
    firebase: Firebase,
  ) => {
    firebase.doPasswordReset(mail).then(() => {
      nav(welcome);
    })
      .catch((err) => {
        alert('Incorrect data');
      });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div className="input-field" onChange={() => { checkIsCorrect(inputMail.current!.value, setCorrect); }}>
            <InputBlock id="Email" parentRef={inputMail} label="E-Mail" type="email" />
          </div>
          <LinkButton text="RESET PASSWORD" disabled={isCorrect} onClick={() => onSubmit(inputMail.current!.value, navigate, firebase)} />
        </>
      )}

    </FirebaseContext.Consumer>
  );
};
export default PasswordForget;
