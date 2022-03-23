import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import sortCards from '../../../../../utils/sortCards';
import { task } from '../../../../../constants/voidObjects';
import { NewColumnAddProps } from '../../../../../types/newColumn';
import patterns, { checkBlockNameInputs } from '../../../../../utils/patterns';

const AddForm = (props: NewColumnAddProps) => {
  const { uid, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState('');

  const errorMessage = checkBlockNameInputs(inputValue);

  const addColumn = () => {
    let lastId = 0;

    if (deskValue.columns) {
      const sortedColumns = Object.values(deskValue.columns).sort(sortCards);

      lastId = sortedColumns[sortedColumns.length - 1].id;
    }

    const deskObjName = deskValue.deskName.split(' ').join('');
    const columnObjName = inputValue.split(' ').join('');

    firebase.column(uid, deskObjName, columnObjName).update({
      tasks: { task },
      id: lastId + 1,
      columnName: inputValue,
    });

    handleActive();
  };

  return (
    <div className="addColonBlock">
      <img
        src="./../x.png"
        alt="add"
        className="addColonImgClose"
        onClick={handleActive}
        aria-hidden="true"
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Colon name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>{errorMessage}</p>
      <button
        type="submit"
        title="Use 1-10 letters or numbers without special symbols"
        disabled={!(patterns.blockName.test(inputValue))}
        onClick={addColumn}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
