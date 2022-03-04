import React, { useContext, useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/openedColumn';
import { FirebaseContext } from '../../../../../utils/fireBase';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deskName,
    columnName,
    setChanging,
  } = props;

  const firebase = useContext(FirebaseContext);

  const renameColumn = (inputValue: string) => {
    const newDesk = userState;

    const oldColumnName = columnName.split(' ').join('_');
    const newColumnName = inputValue.split(' ').join('_');
    const deskNameObj = deskName.split(' ').join('_');

    newDesk.desks[deskNameObj as any]!
      .columns[newColumnName as any] = newDesk.desks[deskNameObj as any]!
        .columns[oldColumnName as any];

    newDesk.desks[deskNameObj as any]!.columns[
      newColumnName as any
    ]!.columnName = inputValue;

    newDesk.desks[deskNameObj as any]!.columns[oldColumnName as any] = null;

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
        onClick={() => renameColumn(inputValue)}
      >
        OK
      </button>
    </>
  );
};
export default ChangeNameField;
