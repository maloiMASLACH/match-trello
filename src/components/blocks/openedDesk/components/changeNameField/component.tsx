import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeDeskNameProps } from '../../../../../types/changeInput';

const ChangeNameField = (props: ChangeDeskNameProps) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState(deskValue.deskName || '');

  const errorMessage = validateBlockName(inputValue);

  const renameDesk = () => {
    const deskObjName = deskValue.deskName.split(' ').join('');
    const newObj = inputValue.split(' ').join('');

    firebase.desk(userValue.uid, deskObjName).set(null);

    deskValue.deskName = inputValue;

    firebase.desk(userValue.uid, newObj).set(deskValue);

    handleChanging();
  };

  return (
    <div className="changeDeskNameInputBlock">
      <input
        className="newDeskName"
        type="text"
        value={inputValue}
        placeholder="New desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="changeNameError">{errorMessage}</p>
      <button
        className="newDeskNameSubmit"
        title="Use 1-10 letters or numbers without special symbols"
        type="submit"
        disabled={!(patterns.blockName.test(inputValue))}
        onClick={renameDesk}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeNameField;
