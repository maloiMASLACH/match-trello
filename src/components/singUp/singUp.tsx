import React, { useRef, useState } from 'react';
import './singUp.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import InputBlock from '../input/input';
import LinkButton from '../linkButton/linkButton';
import Firebase, { FirebaseContext } from '../../fireBase';
import patterns from '../../constants/patterns';
import { welcome } from '../../constants/routerLinks';

interface SingUpBlockProps {
  firebase: Firebase
  state: {
    mail: React.RefObject<HTMLInputElement>,
    name: React.RefObject<HTMLInputElement>,
    password: React.RefObject<HTMLInputElement>,
    confirmPas: React.RefObject<HTMLInputElement>,
    correct: boolean;
    setVisibly: React.Dispatch<React.SetStateAction<boolean>>;
    nav: NavigateFunction
  }
}

class SingUpBlock extends React.Component<SingUpBlockProps> {
  checkIsCorrect = (
    mail:string,
    name:string,
    password:string,
    confirmPas:string,
    setVisibly:React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (mail && name && password && password === confirmPas
      && patterns.mail.test(mail) && patterns.name.test(name) && patterns.password.test(password)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  onSubmit = (mail:string, pass:string, firebase:Firebase, nav:any) => {
    firebase.doCreateUserWithEmailAndPassword(mail, pass).then(() => nav(welcome));
  };

  render(): React.ReactNode {
    const { firebase, state } = this.props;
    return (
      <>
        <div
          className="input-field"
          onChange={() => this.checkIsCorrect(
            state.mail.current!.value,
            state.name.current!.value,
            state.password.current!.value,
            state.confirmPas.current!.value,
            state.setVisibly,
          )}
        >
          <InputBlock id="Login" parentRef={state.name} label="User Name (Login)" type="text" />
          <InputBlock id="Email" parentRef={state.mail} label="Your E-mail" type="email" />
          <InputBlock id="Password" parentRef={state.password} label="Password" type="password" />
          <InputBlock id="ConfirmPassword" parentRef={state.confirmPas} label="Conform Password" type="password" />
        </div>
        <LinkButton text="SING UP" disabled={state.correct} onClick={() => this.onSubmit(state.mail.current!.value, state.password.current!.value, firebase, state.nav)} />

      </>
    );
  }
}

const SingUpForm:React.FC = function () {
  const inputMail = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isCorrect, setCorrect] = useState(Boolean);
  const state = {
    mail: inputMail,
    name: inputName,
    password: inputPassword,
    confirmPas: confirmPassword,
    correct: isCorrect,
    setVisibly: setCorrect,
    nav: navigate,
  };
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <SingUpBlock firebase={firebase} state={state} />}

    </FirebaseContext.Consumer>
  );
};

export default SingUpForm;
