import React, { useContext, useState } from 'react';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeColumnProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import InputBlock from '../../../../controls/input';

const ChangeNameField = (props: ChangeColumnProps) => {
  const {
    uid, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputValue, setInputValue] = useState(columnValue.columnName || '');

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
      <InputBlock
        className="newDeskName"
        id={inputValue}
        value={inputValue}
        label=""
        placeholder="New column name"
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
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
