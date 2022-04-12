import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import { sortCards } from '../../../../../utils/sortCards';
import { task } from '../../../../../constants/voidObjects';
import { NewColumnAddProps } from '../../../../../types/newColumn';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';
import CloseImg from '../../../../controls/images/close';

const AddForm = (props: NewColumnAddProps) => {
  const { uid, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState('');

  const addColumn = () => {
    let lastId = 0;

    if (deskValue.columns) {
      const sortedColumns = Object.values(deskValue.columns).sort(sortCards);

      lastId = sortedColumns[sortedColumns.length - 1].id + 1;
    }

    firebase.column(uid, deskValue.id, lastId).update({
      tasks: { 1: task },
      id: lastId,
      columnName: inputValue,
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
