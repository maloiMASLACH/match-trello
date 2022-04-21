import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import patterns, { validateBlockName } from '../../../../../utils/patterns';
import { ChangeDeskNameProps } from '../../../../../types/changeInput';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';

const ChangeNameField = (props: ChangeDeskNameProps) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);

  const [inputValue, setInputValue] = useState(deskValue.deskName || '');

  const renameDesk = () => {
    const modifiedDesk = {
      ...deskValue,
      deskName: inputValue,
    };

    firebase.desk(userValue.uid, deskValue.id).set(modifiedDesk);

    handleChanging();
  };

  return (
    <div className="changeDeskNameInputBlock">
      <InputBlock
        className="newDeskName"
        id="newDeskName"
        value={inputValue}
        placeholder={Placeholders.Desk}
        type="text"
        validation={validateBlockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button
        className="newDeskNameSubmit"
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
