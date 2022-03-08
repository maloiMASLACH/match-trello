import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import { HandleChanging } from '../../../../../types/toggle';

const ChangeNameField = (props: HandleChanging) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);

  const renameDesk = (inputValue: string) => {
    const deskObjName = deskValue.deskName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase.desk(userValue.uid, deskObjName).set(null);

    deskValue.deskName = inputValue;

    firebase.desk(userValue.uid, newObj).set(deskValue);

    handleChanging();
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input
        className="newDeskName"
        type="text"
        value={inputValue}
        placeholder="New desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="newDeskNameSubmit"
        type="submit"
        onClick={() => renameDesk(inputValue)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
