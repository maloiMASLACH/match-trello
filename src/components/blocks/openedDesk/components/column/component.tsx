import React, { useContext, useState } from 'react';
import { ColumnProps } from '../../../../../types/openedDesk';
import { onDragOver, onDropColumn } from '../../../../../utils/dragEvents';
import './styles.css';
import OpenedColumn from '../../../openedColomn/component';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ChangeNameField from '../../../openedColomn/components/changeNameField';
import DeleteImg from '../../../../controls/images/delete';
import RedactImg from '../../../../controls/images/redact';

const Column = (props: ColumnProps) => {
  const {
    uid, deskObjId, currentColumn, setCurrentColumn, isSwitched,
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
    firebase.column(uid, deskObjId, columnValue.id).set(null);
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
          columnValue,
          currentColumn,
          uid,
          deskObjId,
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
            deskObjId={deskObjId}
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
        <OpenedColumn uid={uid} deskObjId={deskObjId} isSwitched={isSwitched} />
      ) : (
        <p>{`${taskLength} task(s)`}</p>
      )}
    </div>
  );
};

export default Column;
