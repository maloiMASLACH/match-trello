import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import OpenedDesk from '../openedDesk';
import './styles.css';

const DeskWithInfo = () => {
  const deskInfo = useContext(DeskValueContext);

  const [isOpen, setOpenDesk] = useState<boolean>(false);

  let taskCount = 0;
  const columnCount = Object.keys(deskInfo.columns || []).length;

  const handleActive = () => {
    setOpenDesk((prevState) => !prevState);
  };

  if (deskInfo.columns) {
    Object.values(deskInfo.columns).forEach((column: ColumnType) => {
      if (column.tasks) {
        taskCount += Object.keys(column.tasks).length;
      }
    });
  }

  return (
    <>
      <div
        className="infoBlock"
        onClick={handleActive}
        aria-hidden="true"
      >
        <h3>{deskInfo.deskName}</h3>
        <p>{`${columnCount} columns`}</p>
        <p>{`${taskCount} tasks`}</p>
      </div>
      {isOpen && <OpenedDesk handleActive={handleActive} />}
    </>
  );
};

export default DeskWithInfo;
