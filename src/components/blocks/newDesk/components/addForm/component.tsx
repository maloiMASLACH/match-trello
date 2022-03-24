import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import { FirstColumn } from '../../../../../constants/voidObjects';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import sortCards from '../../../../../utils/sortCards';
import { HandleActive } from '../../../../../types/toggle';
import patterns, { validateBlockName } from '../../../../../utils/patterns';

const AddForm = (props: HandleActive) => {
  const { handleActive } = props;

  const userValue = useContext(UserValueContext);
  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const errorMessage = validateBlockName(inputValue);

  const addDesk = () => {
    let lastId = 0;

    if (userValue.desks) {
      const sortedDesks = Object.values(userValue.desks).sort(sortCards);

      lastId = sortedDesks[sortedDesks.length - 1].id;
    }

    const deskObjName = inputValue.split(' ').join('');

    firebase.desk(userValue.uid, deskObjName).update({
      columns: { FirstColumn },
      id: lastId + 1,
      deskName: inputValue,
    });

    handleActive();
  };

  return (
    <div className="addBlock">
      <img
        src="./../x.png"
        alt="add"
        className="addDeskImgClose"
        onClick={handleActive}
        aria-hidden="true"
      />
      <input
        onBlur={() => {
          setTouched(true);
        }}
        type="text"
        value={inputValue}
        placeholder="Desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>{touched && errorMessage}</p>
      <button
        type="submit"
        title="Use 1-10 letters or numbers without special symbols"
        disabled={!(patterns.blockName.test(inputValue))}
        onClick={addDesk}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
