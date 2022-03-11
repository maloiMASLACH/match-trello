import React, { useContext, useState } from 'react';
import { ColumnProps } from '../../../../../types/openedDesk';
import { onDragOver, onDropColumn } from '../../../../../utils/dragEvents';
import './styles.css';
import OpenedColumn from '../../../openedColomn/component';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { FirebaseContext } from '../../../../../utils/fireBase';

const Column = (props: ColumnProps) => {
  const {
    uid, deskObjName, currentColumn, setCurrentColumn,
  } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [isOpenColumn, setOpenColumn] = useState<boolean>(false);

  const taskLength = Object.values(columnValue?.tasks || []).length;

  const handleOpened = () => {
    setOpenColumn((prevState) => !prevState);
  };

  return (
    <>
      <div
        onDragStart={() => {
          setCurrentColumn(columnValue);
        }}
        onDragOver={onDragOver}
        onDrop={() => {
          onDropColumn({
            columnValue,
            currentColumn,
            uid,
            deskObjName,
            firebase,
          });
        }}
        draggable
        className="colon"
        onClick={handleOpened}
        aria-hidden="true"
      >
        <h4>{columnValue!.columnName}</h4>
        <p>{`${taskLength} task(s)`}</p>
      </div>
      {isOpenColumn && (
        <OpenedColumn
          uid={uid}
          deskObjName={deskObjName}
          handleOpened={handleOpened}
        />
      )}
    </>
  );
};

export default Column;
