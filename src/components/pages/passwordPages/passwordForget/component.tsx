import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns, { validateEmail } from '../../../../utils/patterns';
import RouterLinks from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import ErrorBLock from '../../../blocks/errorBlock';
import Labels from '../../../../constants/labels';
import Placeholders from '../../../../constants/placeholders';

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
      <Button
        text="reset password"
        type="submit"
        disabled={!isCorrect}
        onClick={onSubmit}
      />
    </>
  );
};

export default PasswordForget;
