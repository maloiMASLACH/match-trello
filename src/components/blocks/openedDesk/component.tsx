import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import { sortByPosition } from '../../../utils/sortCards';
import NewColumn from '../newColumn';
import './styles.css';
import ChangeNameField from './components/changeNameField';
import Column from './components/column';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import { HandleActive } from '../../../types/toggle';
import ActiveImg from '../../controls/activeImg';

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
    position: 0,
  });

  const sortedColumns = Object.values(deskInfo.columns || []).sort(sortByPosition);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteDesk = () => {
    firebase.desk(userValue.uid, deskInfo.id).set(null);
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
          <ActiveImg
            src="./../redact.png"
            alt="redact"
            className="deskDelete"
            onClick={handleChanging}
          />
          <ActiveImg
            src="./../delete.png"
            alt="delete"
            className="deskDelete"
            onClick={deleteDesk}
          />
          <ActiveImg
            src="./../x.png"
            alt="x"
            onClick={handleActive}
          />
        </div>
      </div>
      <div className="colons">
        { sortedColumns
          .map((column: ColumnType) => (
            <ColumnValueContext.Provider key={column.id} value={column}>
              <Column
                uid={userValue.uid}
                deskObjId={deskInfo.id}
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
