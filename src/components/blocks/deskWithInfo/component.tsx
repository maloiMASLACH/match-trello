import React, { useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import OpenedDesk from '../openedDesk';
import './styles.css';
import { DeskWithInfoProps } from '../../../types/deskWithInfo';

const DeskWithInfo = (props: DeskWithInfoProps) => {
  const [isOpen, setOpenDesk] = useState<boolean>(false);

  const {
    deskInfo, deskName, userState, setUserState,
  } = props;

  let taskCount = 0;

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
        onClick={() => {
          setOpenDesk(true);
        }}
        aria-hidden="true"
      >
        <h3>{deskName}</h3>
        <p>
          {`${deskInfo.columns ? Object.keys(deskInfo.columns).length : 0} columns`}
        </p>
        <p>
          {`${taskCount} tasks`}
        </p>
      </div>
      {isOpen && (
        <OpenedDesk
          deskInfo={deskInfo}
          deskName={deskName}
          setOpenDesk={setOpenDesk}
          userState={userState}
          setUserState={setUserState}
        />
      ) }
    </>
  );
};

export default DeskWithInfo;
