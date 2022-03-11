import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patterns from '../../../../constants/patterns';
import { welcome } from '../../../../constants/routerLinks';
import { FirebaseContext } from '../../../../utils/fireBase';
import InputBlock from '../../../controls/input';
import Button from '../../../controls/button';
import ErrorBLock from '../../../blocks/errorBlock';

const PasswordForget: React.FC = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [inputMail, setInputMail] = useState('');
  const [error, setError] = useState('');

  const isCorrect = inputMail
    && patterns.mail.test(inputMail);

  const onSubmit = () => {
    firebase
      .doPasswordReset(inputMail)
      .then(() => {
        navigate(welcome);
      })
      .catch(() => {
        setError('Incorrect data');
      });
  };

  return (
    <>
      <div
        className="input-field"
      >
        <InputBlock
          id="Email"
          value={inputMail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMail(e.target.value)}
          label="E-Mail"
          type="email"
        />
      </div>
      {error ? <ErrorBLock errorText={error} /> : null}
      <Button
        text="reset password"
        disabled={!isCorrect}
        type="submit"
        onClick={onSubmit}
      />
    </>
  );
};

export default PasswordForget;
