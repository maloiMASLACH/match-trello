import React, { useContext, useState } from 'react';
import { Placeholders } from '../../../../../constants';
import { NewColumnAddProps } from '../../../../../types';
import {
  FirebaseContext, DeskValueContext, sortCards, patterns, validateBlockName,
} from '../../../../../utils';
import { InputBlock } from '../../../../controls';
import { CloseImg } from '../../../../controls/images';
import './styles.css';

const AddForm = (props: NewColumnAddProps) => {
  const { uid, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const { columns, id } = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState('');

  const addColumn = () => {
    let lastId = 0;

    if (columns) {
      const sortedColumns = Object.values(columns).sort(sortCards);

      lastId = sortedColumns[sortedColumns.length - 1].id + 1;
    }

    firebase
      .column({ uid, deskObjId: id, columnObjId: lastId })
      .update({
        id: lastId,
        columnName: inputValue,
        deskObjId: id,
        position: lastId,
      });

    handleActive();
  };

  return (
    <div className="addColonBlock">
      <CloseImg className="addColonImgClose" onClick={handleActive} />
      <InputBlock
        id="newColonName"
        value={inputValue}
        placeholder={Placeholders.Colon}
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!patterns.blockName.test(inputValue)}
        onClick={addColumn}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
