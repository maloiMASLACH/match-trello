import React, { useContext, useState } from 'react';
import { Placeholders } from '../../../../../constants';
import { HandleActive } from '../../../../../types';
import {
  UserValueContext, FirebaseContext, sortCards, validateBlockName, patterns,
} from '../../../../../utils';
import { InputBlock } from '../../../../controls';
import { CloseImg } from '../../../../controls/images';
import './styles.css';

const AddForm = (props: HandleActive) => {
  const { handleActive } = props;

  const { desks, uid } = useContext(UserValueContext);
  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');

  const addDesk = () => {
    let lastId = 0;

    if (desks) {
      const sortedDesks = Object.values(desks).sort(sortCards);

      lastId = sortedDesks[sortedDesks.length - 1].id + 1;
    }

    firebase.desk(uid, lastId).update({
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
