import React, { useContext, useState } from 'react';
import { ColumnProps } from '../../../../../types/openedDesk';
import {
  onDragStart, onDragOver, onDropColumn,
} from '../../../../../utils/dragEvents';
import './styles.css';
import OpenedColumn from '../../../openedColomn/component';
import { FirebaseContext } from '../../../../../utils/fireBase';

const Column = (props: ColumnProps) => {
  const {
    column,
    deskName,
    userState,
    setUserState,
    currentCard,
    setCurrentCard,
  } = props;

  const firebase = useContext(FirebaseContext);

  const [isOpenColumn, setOpenColumn] = useState<boolean>(false);

  let taskLength = 0;

  if (column.tasks) {
    taskLength = Object.keys(column.tasks).length;
  }

  return (
    <>
      <div
        onDragStart={() => {
          onDragStart(column, setCurrentCard);
        }}
        onDragOver={(e) => onDragOver(e)}
        onDrop={() => onDropColumn(column, currentCard, deskName, userState, firebase)}
        draggable
        className="colon"
        onClick={() => {
          setOpenColumn(true);
        }}
        aria-hidden="true"
      >
        <h4>{column.columnName}</h4>
        <p>
          {taskLength}
          {' '}
          task(s)
        </p>
      </div>
      {isOpenColumn && (
        <OpenedColumn
          column={column}
          deskName={deskName}
          userState={userState}
          setUserState={setUserState}
          setOpenColumn={setOpenColumn}
        />
      )}
    </>
  );
};

export default Column;
