import React, { useContext, useState } from 'react';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeColumnProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';

const ChangeNameField = (props: ChangeColumnProps) => {
  const {
    uid, deskObjId, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputValue, setInputValue] = useState(columnValue.columnName || '');

  const renameColumn = () => {
    const modifiedColumn = {
      ...columnValue,
      columnName: inputValue,
    };

    firebase.column(uid, deskObjId, columnValue.id).set(modifiedColumn);

    handleChanging();
  };

  return (
    <div className="changeDeskNameInputBlock">
      <InputBlock
        className="newDeskName"
        id="newColonName"
        value={inputValue}
        placeholder={Placeholders.Colon}
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button
        className="newDeskNameSubmit"
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
