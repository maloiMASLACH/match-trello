import { ColumnType, TaskType } from '../../types/globalTypes';
import Firebase from '../fireBase';

interface OnDropColumnProps {
  e: React.DragEvent<HTMLDivElement>;
  columnValue: ColumnType;
  currentColumn: ColumnType;
  uid: string;
  deskObjId: number;
  firebase: Firebase;
}

interface OnDropCardProps {
  e: React.DragEvent<HTMLDivElement>;
  taskValue: TaskType;
  currentCard: TaskType;
  uid: string;
  deskObjId: number;
  columnObjId: number;
  firebase: Firebase;
}

export const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  return null;
};
export const onDropColumn = (props: OnDropColumnProps) => {
  const {
    e, columnValue, currentColumn, uid, deskObjId, firebase,
  } = props;

  if (e.currentTarget.getAttribute('draggable') === 'true' && currentColumn.columnName) {
    firebase.columnPosition(uid, deskObjId, columnValue.id).set(currentColumn.position);
    firebase.columnPosition(uid, deskObjId, currentColumn.id).set(columnValue.position);
  }
};

export const onDropCard = (props: OnDropCardProps) => {
  const {
    e,
    taskValue,
    currentCard,
    uid,
    deskObjId,
    columnObjId,
    firebase,
  } = props;

  if (e.currentTarget.getAttribute('draggable') === 'true' && currentCard.taskName) {
    firebase
      .taskPosition(uid, deskObjId, columnObjId, taskValue.id)
      .set(currentCard.position);
    firebase
      .taskPosition(uid, deskObjId, columnObjId, currentCard.id)
      .set(taskValue.position);
  }
};
