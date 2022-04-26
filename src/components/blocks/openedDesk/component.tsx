import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { sortByPosition } from '../../../utils/sortCards';
import NewColumn from '../newColumn';
import './styles.css';
import Column from './components/column';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import { columnChecker } from '../../../utils/assignedChecker';
import AuthUserContext from '../../../utils/sessionHandler';
import { OpenedDeskProps } from '../../../types/openedDesk';

const OpenedDesk = (props: OpenedDeskProps) => {
  const { isSwitched } = props;

  const userValue = useContext(UserValueContext);
  const deskInfo = useContext(DeskValueContext);
  const { userMail } = useContext(AuthUserContext);

  const [currentColumn, setCurrentColumn] = useState<ColumnType>({
    tasks: [],
    columnName: '',
    id: 0,
    position: 0,
  });

  const sortedColumns = Object.values(deskInfo.columns || []).sort(
    sortByPosition,
  );

  const yourColumns = !isSwitched
    ? sortedColumns
    : columnChecker(sortedColumns, userMail);

  return (
    <div className="openedDeskBlock">
      <div className="colons">
        {yourColumns.map((column: ColumnType) => (
          <ColumnValueContext.Provider key={column.id} value={column}>
            <Column
              uid={userValue.uid}
              deskObjId={deskInfo.id}
              currentColumn={currentColumn}
              setCurrentColumn={setCurrentColumn}
              isSwitched={isSwitched}
            />
          </ColumnValueContext.Provider>
        ))}
        <NewColumn uid={userValue.uid} />
      </div>
    </div>
  );
};

export default OpenedDesk;
