import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import { FirstColumn } from '../../../../../constants/voidObjects';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import sortCards from '../../../../../utils/sortCards';
import { HandleActive } from '../../../../../types/toggle';

const AddForm = (props: HandleActive) => {
  const { handleActive } = props;

  const userValue = useContext(UserValueContext);
  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');

  const addDesk = (name: string) => {
    let lastId = 0;
    if (userValue.desks) {
      lastId = Object.values(userValue.desks).sort(sortCards).slice(-1)[0].id;
    }

    const deskObjName = name.split(' ').join('');

    firebase.desk(userValue.uid, deskObjName).update({
      columns: {
        FirstColumn,
      },
      id: lastId ? lastId + 1 : 1,
      deskName: name,
    });

    handleActive();
  };

  return (
    <div className="addBlock">
      <img
        src="./x.png"
        alt="add"
        className="addDeskImgClose"
        onClick={handleActive}
        aria-hidden="true"
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!inputValue}
        onClick={() => {
          addDesk(inputValue);
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
