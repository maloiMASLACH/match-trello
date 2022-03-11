import React, { useContext, useState } from 'react';
import { ChangeColumnProps } from '../../../../../types/openedColumn';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';

const ChangeNameField = (props: ChangeColumnProps) => {
  const { uid, deskObjName, handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputValue, setInputValue] = useState('');

  const renameColumn = () => {
    const columnObjName = columnValue.columnName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase.column(uid, deskObjName, columnObjName).set(null);

    columnValue.columnName = inputValue;

    firebase.column(uid, deskObjName, newObj).set(columnValue);

    handleChanging();
  };

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
        onClick={renameColumn}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
