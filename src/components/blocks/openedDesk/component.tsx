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
  const [currentColumn, setCurrentColumn] = useState<ColumnType>({
    tasks: [],
    columnName: '',
    id: 0,
  });

  const deskObjName = deskInfo.deskName.split(' ').join('');

  const sortedColumns = Object.values(deskInfo.columns || []).sort(sortCards);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteDesk = () => {
    firebase.desk(userValue.uid, deskObjName).set(null);
  };

  return (
    <div className="openedDeskBlock">
      <div className="openedDeskBlockHead">
        {!isChanging ? (
          <h3>
            {deskInfo.deskName}
          </h3>
        ) : (
          <ChangeNameField handleChanging={handleChanging} />
        )}
        <div className="toolImg">
          <img
            className="deskDelete"
            src="./../redact.png"
            alt="redact"
            onClick={() => {
              handleChanging();
            }}
            aria-hidden="true"
          />
          <img
            className="deskDelete"
            alt="delete"
            src="./../delete.png"
            onClick={deleteDesk}
            aria-hidden="true"
          />
          <img
            src="./../x.png"
            alt="x"
            onClick={handleActive}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="colons">
        { sortedColumns
          .map((column: ColumnType) => (
            <ColumnValueContext.Provider key={column.id} value={column}>
              <Column
                uid={userValue.uid}
                deskObjName={deskObjName}
                currentColumn={currentColumn}
                setCurrentColumn={setCurrentColumn}
              />
            </ColumnValueContext.Provider>
          ))}
        <NewColumn uid={userValue.uid} />
      </div>
    </div>
  );
};

export default OpenedDesk;
