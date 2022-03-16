import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import patterns from '../../../../../constants/patterns';
import { ChangeDeskNameProps } from '../../../../../types/changeInput';

const ChangeNameField = (props: ChangeDeskNameProps) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState(deskValue.deskName || '');

  const renameDesk = () => {
    const deskObjName = deskValue.deskName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase.desk(userValue.uid, deskObjName).set(null);

    deskValue.deskName = inputValue;

    firebase.desk(userValue.uid, newObj).set(deskValue);

    handleChanging();
  };

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
        disabled={!(patterns.blockName.test(inputValue))}
        onClick={renameDesk}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
