import React, { useContext, useState } from 'react';
import './styles.css';
import { ChangeNameFieldProps } from '../../../../../types/openedDesk';
import { FirebaseContext } from '../../../../../utils/fireBase';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState, setUserState, deskName, setChanging,
  } = props;

  const firebase = useContext(FirebaseContext);

  const renameDesk = (inputValue: string) => {
    const newDesk = userState;
    const oldDeskName = deskName.split(' ').join('_');
    const newDeskName = inputValue.split(' ').join('_');
    newDesk.desks[newDeskName as any] = newDesk.desks[oldDeskName as any];
    newDesk.desks[newDeskName as any]!.deskName = inputValue;
    newDesk.desks[oldDeskName as any] = null;

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
