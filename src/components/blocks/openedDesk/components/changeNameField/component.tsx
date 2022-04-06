import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeDeskNameProps } from '../../../../../types/changeInput';
import InputBlock from '../../../../controls/input';

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
    <div className="changeDeskNameInputBlock">
      <InputBlock
        className="newDeskName"
        id={inputValue}
        value={inputValue}
        label=""
        placeholder="New desk name"
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
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
