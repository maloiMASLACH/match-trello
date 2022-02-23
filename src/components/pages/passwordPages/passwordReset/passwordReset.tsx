import React, { useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../input/input';
import LinkButton from '../../../linkButton/linkButton';

const PasswordReset:React.FC = function () {
  const passwordOne = useRef<HTMLInputElement>(null);
  const passwordTwo = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    password:string,
    confirm:string,
    setVisibly:React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (password === confirm && patterns.password.test(password)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (
    password:string,
    nav: NavigateFunction,
    firebase: Firebase,
  ) => {
    firebase.doPasswordUpdate(password).then(() => {
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
          <div className="input-field" onChange={() => { checkIsCorrect(passwordOne.current!.value, passwordTwo.current!.value, setCorrect); }}>
            <InputBlock id="oldPassword" parentRef={passwordOne} label="New Password" type="password" />
            <InputBlock id="newPassword" parentRef={passwordTwo} label="Confirm Password" type="password" />

          </div>
          <LinkButton text="CHANGE PASSWORD" disabled={isCorrect} onClick={() => onSubmit(passwordOne.current!.value, navigate, firebase)} />
        </>
      )}

    </FirebaseContext.Consumer>
  );
};
export default PasswordReset;
