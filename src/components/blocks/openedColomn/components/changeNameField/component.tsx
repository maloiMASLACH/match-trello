import React, { useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/openedColumn';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deskName,
    columnName,
    setChanging,
    firebase,
  } = props;

  const renameDesk = (inputValue: string) => {
    const newDesk = userState;

    const oldColumnName = columnName.split(' ').join('_');
    const newColumnName = inputValue.split(' ').join('_');

    newDesk.desks[deskName].columns[newColumnName] = newDesk.desks[deskName].columns[oldColumnName];
    newDesk.desks[deskName].columns[newColumnName].columnName = inputValue;

    newDesk.desks[deskName].columns[oldColumnName] = null;

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
        placeholder="New column name"
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
