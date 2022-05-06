import React, { useContext, useState } from 'react';
import { Placeholders } from '../../../../../constants';
import { ChangeColumnProps } from '../../../../../types';
import {
  FirebaseContext, ColumnValueContext, validateBlockName, patterns,
} from '../../../../../utils';
import { InputBlock } from '../../../../controls';

const ChangeNameField = (props: ChangeColumnProps) => {
  const { uid, handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputValue, setInputValue] = useState(columnValue.columnName || '');

  const renameColumn = () => {
    const modifiedColumn = {
      ...columnValue,
      columnName: inputValue,
    };

    firebase
      .column({ uid, deskObjId: Number(columnValue.deskObjId), columnObjId: columnValue.id })
      .set(modifiedColumn);

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
        disabled={!patterns.blockName.test(inputValue)}
        type="submit"
        onClick={renameColumn}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeNameField;
