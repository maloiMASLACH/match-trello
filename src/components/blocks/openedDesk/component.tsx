import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types';
import {
  UserValueContext, DeskValueContext, invertSort, ColumnValueContext,
} from '../../../utils';
import NewColumn from '../newColumn';
import Column from './components/column';
import './styles.css';

const OpenedDesk = () => {
  const userValue = useContext(UserValueContext);
  const deskInfo = useContext(DeskValueContext);

  const [currentColumn, setCurrentColumn] = useState<ColumnType>({
    tasks: [],
    columnName: '',
    id: 0,
    deskObjId: '',
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
      <div className="colons" onWheel={yScroll}>
        <NewColumn uid={userValue.uid} />
        {sortedColumns.map((column: ColumnType) => (
          <ColumnValueContext.Provider key={column.id} value={column}>
            <Column
              uid={userValue.uid}
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
