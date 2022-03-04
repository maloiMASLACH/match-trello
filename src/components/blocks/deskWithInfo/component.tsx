import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import OpenedDesk from '../openedDesk';
import './styles.css';

const DeskWithInfo = () => {
  const [isOpen, setOpenDesk] = useState<boolean>(false);

  const deskInfo = useContext(DeskValueContext);

  const handleActive = () => {
    setOpenDesk((prevState) => !prevState);
  };

  let taskCount = 0;

  if (deskInfo!.columns) {
    Object.values(deskInfo!.columns).forEach((column: ColumnType | null) => {
      if (column!.tasks) {
        taskCount += Object.keys(column!.tasks).length;
      }
    });
  }

  return (
    <>
      <div
        className="infoBlock"
        onClick={() => {
          handleActive();
        }}
        aria-hidden="true"
      >
        <h3>{deskInfo!.deskName}</h3>
        <p>
          {`${
            deskInfo!.columns ? Object.keys(deskInfo!.columns).length : 0
          } columns`}
        </p>
        <p>{`${taskCount} tasks`}</p>
      </div>
      {isOpen && <OpenedDesk handleActive={handleActive} />}
    </>
  );
};

export default DeskWithInfo;
