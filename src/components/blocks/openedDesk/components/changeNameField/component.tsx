import React, { useState } from 'react';
import './styles.css';
import { ChangeNameFieldProps } from '../../../../../types/openedDesk';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState, setUserState, deskName, setChanging, firebase,
  } = props;

  const renameDesk = (inputValue: string) => {
    const newDesk = userState;
    const newDeskName = inputValue.split(' ').join('_');
    newDesk.desks[newDeskName] = newDesk.desks[deskName];

    newDesk.desks[deskName] = null;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setChanging(false);
      });
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input
        className="newDeskName"
        type="text"
        value={inputValue}
        placeholder="New desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="newDeskNameSubmit"
        type="submit"
        onClick={() => renameDesk(inputValue)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
