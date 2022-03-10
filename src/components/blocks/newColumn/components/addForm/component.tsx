import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import sortCards from '../../../../../utils/sortCards';
import { task } from '../../../../../constants/voidObjects';
import { NewColumnAddProps } from '../../../../../types/newColumn';

const AddForm = (props: NewColumnAddProps) => {
  const { uid, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState('');

  const addColumn = (name: string) => {
    let lastId = 0;

    if (deskValue.columns) {
      lastId = Object.values(deskValue.columns).sort(sortCards).slice(-1)[0].id;
    }

    const deskObjName = deskValue.deskName.split(' ').join('');
    const columnObjName = name.split(' ').join('');

    firebase.column(uid, deskObjName, columnObjName).update({
      tasks: { task },
      id: lastId + 1,
      columnName: name,
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
      <button
        type="submit"
        disabled={!inputValue}
        onClick={() => {
          addColumn(inputValue);
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
