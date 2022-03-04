import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewColumn from '../newColumn';
import './styles.css';
import ChangeNameField from './components/changeNameField';
import Column from './components/column';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import { HandleActive } from '../../../types/toggle';

const OpenedDesk = (props: HandleActive) => {
  const { handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskInfo = useContext(DeskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<ColumnType | null>(null);

  const deskObjName = deskInfo!.deskName.split(' ').join('');

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteDesk = () => {
    firebase!.desk(userValue!.uid, deskObjName).set(null);
  };

  return (
    <div className="openedDeskBlock">
      <div className="openedDeskBlockHead">
        <h3>
          {!isChanging && deskInfo!.deskName}
          {isChanging && <ChangeNameField handleChanging={handleChanging} />}
        </h3>
        <img
          className="deskDelete"
          src="./redact.png"
          alt="redact"
          onClick={() => {
            setChanging(!isChanging);
          }}
          aria-hidden="true"
        />
        <img
          className="deskDelete"
          alt="delete"
          src="./delete.png"
          onClick={() => deleteDesk()}
          aria-hidden="true"
        />
        <img
          src="./x.png"
          alt="x"
          onClick={() => {
            handleActive();
          }}
          aria-hidden="true"
        />
      </div>
      <div className="colons">
        {deskInfo!.columns
          ? Object.values(deskInfo!.columns)
            .sort(sortCards)
            .map((column: ColumnType | null) => (
              <ColumnValueContext.Provider value={column}>
                <Column
                  currentCard={currentColumn}
                  setCurrentCard={setCurrentColumn}
                />
              </ColumnValueContext.Provider>
            ))
          : null}
        <NewColumn />
      </div>
    </div>
  );
};

export default OpenedDesk;
