import React, { useContext, useState } from 'react';
import { HandleChanging } from '../../../../../types/toggle';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';

const ChangeNameField = (props: HandleChanging) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);
  const columnValue = useContext(ColumnValueContext);

  const renameColumn = (inputValue: string) => {
    const deskObjName = deskValue!.deskName.split(' ').join('');
    const columnObjName = columnValue!.columnName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase!.column(userValue!.uid, deskObjName, columnObjName).set(null);

    columnValue!.columnName = inputValue;

    firebase!.column(userValue!.uid, deskObjName, newObj).set(columnValue);

    handleChanging();
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
