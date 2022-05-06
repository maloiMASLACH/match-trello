import React, { useContext, useState } from 'react';
import { ColumnProps } from '../../../../../types';
import {
  FirebaseContext, ColumnValueContext, onDragOver, onDropColumn,
} from '../../../../../utils';
import { RedactImg, DeleteImg } from '../../../../controls/images';
import OpenedColumn from '../../../openedColomn';
import ChangeNameField from '../../../openedColomn/components/changeNameField';
import './styles.css';

const Column = (props: ColumnProps) => {
  const {
    uid, currentColumn, setCurrentColumn,
  } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [isOpenColumn, setOpenColumn] = useState<boolean>(true);
  const [isChanging, setChanging] = useState<boolean>(false);

  const taskLength = Object.values(columnValue?.tasks || []).length;

  const handleOpened = () => {
    setOpenColumn((prevState) => !prevState);
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteColumn = () => {
    firebase.column({
      uid,
      deskObjId: Number(columnValue.deskObjId),
      columnObjId: columnValue.id,
    }).set(null);
  };

  return (
    <div
      onDragStart={() => {
        setCurrentColumn(columnValue);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => {
        onDropColumn({
          e,
          card: columnValue,
          currentCard: currentColumn,
          uid,
          firebase,
        });
      }}
      draggable
      className="column"
      aria-hidden="true"
    >
      <div className="columnHead">
        {isChanging ? (
          <ChangeNameField
            uid={uid}
            handleChanging={handleChanging}
          />
        ) : (
          <div className="columnInfo">
            <h4>{columnValue!.columnName}</h4>
            <i
              className="fa fa-eye table"
              aria-hidden="true"
              onClick={handleOpened}
            />
          </div>
        )}
        <div className="toolImg">
          <RedactImg className="deskDelete" onClick={handleChanging} />
          <DeleteImg className="deskDelete" onClick={deleteColumn} />
        </div>
      </div>
      {isOpenColumn ? (
        <OpenedColumn uid={uid} />
      ) : (
        <p>{`${taskLength} task(s)`}</p>
      )}
    </div>
  );
};

export default Column;
