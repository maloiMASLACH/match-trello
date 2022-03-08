import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import { OnSubmitProps } from '../../../../types/passwordForget';

const PasswordForget: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [isCorrect, setCorrect] = useState(Boolean);

  const navigate = useNavigate();

  const handleChecked = () => {
    setCorrect((prevState) => !prevState);
  };

  const checkIsCorrect = (
    mail: string,
  ) => {
    if (mail && patterns.mail.test(mail)) {
      handleChecked();
    } else handleChecked();
  };

  const onSubmit = ({ mail, nav }: OnSubmitProps) => {
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
    <>
      <div
        className="input-field"
        onChange={() => {
          checkIsCorrect(inputMail);
        }}
      >
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label="E-Mail"
          type="email"
        />
      </div>
      <Button
        text="RESET PASSWORD"
        disabled={isCorrect}
        type="submit"
        onClick={() => onSubmit({ mail: inputMail, nav: navigate })}
      />
    </>
  );
};
export default PasswordForget;
