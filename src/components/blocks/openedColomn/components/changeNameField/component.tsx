import React, { useContext, useState } from 'react';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeColumnProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';

const ChangeNameField = (props: ChangeColumnProps) => {
  const {
    uid, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputValue, setInputValue] = useState(columnValue.columnName || '');

  const errorMessage = validateBlockName(inputValue);

  const renameColumn = () => {
    const columnObjName = columnValue.columnName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase.column(uid, deskObjName, columnObjName).set(null);

    columnValue.columnName = inputValue;

    firebase.column(uid, deskObjName, newObj).set(columnValue);

    handleChanging();
  };

  return (
    <div className="changeDeskNameInputBlock">
      <input
        className="newDeskName"
        type="text"
        value={inputValue}
        placeholder="New column name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="changeNameError">{errorMessage}</p>
      <button
        className="newDeskNameSubmit"
        title="Use 1-10 letters or numbers without special symbols"
        disabled={!(patterns.blockName.test(inputValue))}
        type="submit"
        onClick={renameColumn}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeNameField;
