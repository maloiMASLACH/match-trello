import React, { useRef, useState } from 'react';
import patterns from '../../constants/patterns';
import Firebase, { FirebaseContext } from '../../fireBase';
import InputBlock from '../input/input';
import LinkButton from '../linkButton/linkButton';
import './singIn.css';

interface SingInBlockProps{
  firebase: Firebase,
  state: {
    mail: React.RefObject<HTMLInputElement>,
    password: React.RefObject<HTMLInputElement>,
    correct: boolean;
    setVisibly: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

class SingInBlock extends React.Component<SingInBlockProps> {
  checkIsCorrect = (
    mail:string,
    password:string,
    setVisibly:React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (mail && password && patterns.mail.test(mail) && patterns.password.test(password)) {
      setVisibly(true);
    } else setVisibly(false);
  };

  onSubmit = () => {
    console.log('singIn submit');
  };

  render(): React.ReactNode {
    const { firebase, state } = this.props;
    return (
      <>
        <div className="input-field" onChange={() => { this.checkIsCorrect(state.mail.current!.value, state.password.current!.value, state.setVisibly); }}>
          <InputBlock id="Email" parentRef={state.mail} label="E-Mail" type="email" />
          <InputBlock id="Password" parentRef={state.password} label="Password" type="password" />

        </div>
        <LinkButton text="SING IN" disabled={state.correct} onClick={() => this.onSubmit()} />

      </>
    );
  }
}

const SingInForm:React.FC = function () {
  const inputMail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const [isCorrect, setCorrect] = useState(Boolean);
  const state = {
    mail: inputMail,
    password: inputPassword,
    correct: isCorrect,
    setVisibly: setCorrect,
  };
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <SingInBlock firebase={firebase} state={state} />}

    </FirebaseContext.Consumer>
  );
};
export default SingInForm;
