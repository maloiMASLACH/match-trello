import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import { FirstColumn } from '../../../../../constants/voidObjects';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import { sortCards } from '../../../../../utils/sortCards';
import { HandleActive } from '../../../../../types/toggle';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';
import CloseImg from '../../../../controls/images/close';

const AddForm = (props: HandleActive) => {
  const { handleActive } = props;

  const userValue = useContext(UserValueContext);
  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');

  const addDesk = () => {
    let lastId = 0;

    if (userValue.desks) {
      const sortedDesks = Object.values(userValue.desks).sort(sortCards);

      lastId = sortedDesks[sortedDesks.length - 1].id + 1;
    }

    firebase.desk(userValue.uid, lastId).update({
      columns: { 1: FirstColumn },
      id: lastId,
      deskName: inputValue,
    });

    handleActive();
  };

  return (
    <div className="addBlock">
      <CloseImg className="addDeskImgClose" onClick={handleActive} />
      <InputBlock
        id="newDeskName"
        value={inputValue}
        placeholder={Placeholders.Desk}
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!patterns.blockName.test(inputValue)}
        onClick={addDesk}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
