import React, { useContext, useState } from 'react';
import { ColumnProps } from '../../../../../types/openedDesk';
import {
  onDragStart,
  onDragOver,
  onDropColumn,
} from '../../../../../utils/dragEvents';
import './styles.css';
import OpenedColumn from '../../../openedColomn/component';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';

const Column = (props: ColumnProps) => {
  const { currentCard, setCurrentCard } = props;

  const columnValue = useContext(ColumnValueContext);

  const [isOpenColumn, setOpenColumn] = useState<boolean>(false);

  const handleOpened = () => {
    setOpenColumn((prevState) => !prevState);
  };

  let taskLength = 0;

  if (columnValue!.tasks) {
    taskLength = Object.keys(columnValue!.tasks).length;
  }

  return (
    <>
      <div
        onDragStart={() => {
          onDragStart(columnValue, setCurrentCard);
        }}
        onDragOver={(e) => onDragOver(e)}
        onDrop={() => onDropColumn(columnValue, currentCard)}
        draggable
        className="colon"
        onClick={() => {
          handleOpened();
        }}
        aria-hidden="true"
      >
        <h4>{columnValue!.columnName}</h4>
        <p>
          {taskLength}
          {' '}
          task(s)
        </p>
      </div>
      {isOpenColumn && <OpenedColumn handleOpened={handleOpened} />}
    </>
  );
};

export default Column;
