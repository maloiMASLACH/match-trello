import React, { useContext, useState } from 'react';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import OpenedDesk from '../openedDesk';
import './styles.css';

const DeskWithInfo = () => {
  const deskInfo = useContext(DeskValueContext);

  const [isOpen, setOpenDesk] = useState<boolean>(false);

  const handleActive = () => {
    setOpenDesk((prevState) => !prevState);
  };

  let taskCount = 0;
  const columnCount = Object.keys(deskInfo.columns || []).length;

  if (deskInfo.columns) {
    taskCount = Object.values(deskInfo.columns).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  return (
    <>
      <div className="infoBlock" onClick={handleActive} aria-hidden="true">
        <h3>{deskInfo.deskName}</h3>
        <p>{`${columnCount} columns`}</p>
        <p>{`${taskCount} tasks`}</p>
      </div>
      {isOpen && <OpenedDesk handleActive={handleActive} />}
    </>
  );
};

export default DeskWithInfo;
