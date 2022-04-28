import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { sortByPosition } from '../../../utils/sortCards';
import NewColumn from '../newColumn';
import './styles.css';
import Column from './components/column';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';

const OpenedDesk = () => {
  const userValue = useContext(UserValueContext);
  const deskInfo = useContext(DeskValueContext);

  const [currentColumn, setCurrentColumn] = useState<ColumnType>({
    tasks: [],
    columnName: '',
    id: 0,
    position: 0,
  });

  const sortedColumns = Object.values(deskInfo.columns || []).sort(
    sortByPosition,
  );

  return (
    <div className="openedDeskBlock">
      <div className="colons">
        {sortedColumns.map((column: ColumnType) => (
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
