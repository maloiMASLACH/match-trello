import React, { useContext, useState } from 'react';
import { Placeholders } from '../../../../../constants';
import { ChangeDeskNameProps } from '../../../../../types';
import {
  FirebaseContext, UserValueContext, DeskValueContext, patterns,
} from '../../../../../utils';
import { validateBlockName } from '../../../../../utils/patterns';
import { InputBlock } from '../../../../controls';
import './styles.css';

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
