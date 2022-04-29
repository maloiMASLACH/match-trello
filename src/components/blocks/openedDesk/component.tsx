import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { invertSort } from '../../../utils/sortCards';
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
    invertSort,
  );

  const yScroll = (e:React.WheelEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.scrollTo({
        top: 0,
        left: e.currentTarget.scrollLeft += e.deltaY * 0.2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="openedDeskBlock">
      <div className="colons" onWheel={(e) => yScroll(e)}>
        <NewColumn uid={userValue.uid} />
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
      </div>
    </div>
  );
};

export default OpenedDesk;
