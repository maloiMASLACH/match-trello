import React, { useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { User } from '../../constants/interfaces';
import patterns from '../../constants/patterns';
import { welcome } from '../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../fireBase';
import InputBlock from '../input/input';
import LinkButton from '../linkButton/linkButton';
import './singIn.css';

interface SingInFormProps{
  setUser:React.Dispatch<React.SetStateAction<User>>,
  user:User
}

const SingInForm:React.FC<SingInFormProps> = function (props) {
  const { setUser, user } = props;
  const inputMail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);

  const checkIsCorrect = (
    mail:string,
    password:string,
    setVisibly:React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (mail && password && patterns.mail.test(mail) && patterns.password.test(password)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  const onSubmit = (mail:string, password:string, nav: NavigateFunction, firebase: Firebase) => {
    firebase.doSignInWithEmailAndPassword(mail, password).then((res) => {
      const newUser:User = { email: mail, shortMail: mail };
      setUser(newUser);
      nav(welcome);
      console.log(res.user, firebase);
    });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <>
          <div className="input-field" onChange={() => { checkIsCorrect(inputMail.current!.value, inputPassword.current!.value, setCorrect); }}>
            <InputBlock id="Email" parentRef={inputMail} label="E-Mail" type="email" />
            <InputBlock id="Password" parentRef={inputPassword} label="Password" type="password" />

          </div>
          <LinkButton text="SING IN" disabled={isCorrect} onClick={() => onSubmit(inputMail.current!.value, inputPassword.current!.value, navigate, firebase)} />

        </>
      )}

    </FirebaseContext.Consumer>
  );
};
export default SingInForm;
