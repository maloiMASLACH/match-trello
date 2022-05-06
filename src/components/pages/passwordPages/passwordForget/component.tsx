import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterLinks, Labels, Placeholders } from '../../../../constants';
import { FirebaseContext, patterns, validateEmail } from '../../../../utils';
import ErrorBLock from '../../../blocks/errorBlock';
import { InputBlock, LinkButton } from '../../../controls';

const PasswordForget: React.FC = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [error, setError] = useState('');

  const isCorrect = inputMail && patterns.mail.test(inputMail);

  const onSubmit = () => {
    firebase
      .doPasswordReset(inputMail)
      .then(() => {
        navigate(RouterLinks.Welcome);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      <div className="input-field">
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label={Labels.Email}
          type="email"
          placeholder={Placeholders.Mail}
          validation={validateEmail}
        />
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <LinkButton
        text="reset password"
        type="submit"
        disabled={!isCorrect}
        onClick={onSubmit}
      />
    </>
  );
};

export default PasswordForget;
