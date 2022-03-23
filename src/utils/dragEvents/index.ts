import { ColumnType, TaskType } from '../../types/globalTypes';
import Firebase from '../fireBase';

interface OnDropColumnProps {
  e: React.DragEvent<HTMLDivElement>;
  columnValue: ColumnType;
  currentColumn: ColumnType;
  uid: string;
  deskObjName: string;
  firebase: Firebase;
}

interface OnDropCardProps {
  e: React.DragEvent<HTMLDivElement>;
  taskValue: TaskType;
  currentCard: TaskType;
  uid: string;
  deskObjName: string;
  columnObjName: string;
  firebase: Firebase;
}

export const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  return null;
};
export const onDropColumn = (props: OnDropColumnProps) => {
  const {
    e, columnValue, currentColumn, uid, deskObjName, firebase,
  } = props;

  if (e.currentTarget.getAttribute('draggable') === 'true' && currentColumn.columnName) {
    const firstColumnObjName = columnValue.columnName.split(' ').join('');
    const secondColumnObjName = currentColumn.columnName.split(' ').join('');

    firebase.columnId(uid, deskObjName, firstColumnObjName).set(currentColumn.id);
    firebase.columnId(uid, deskObjName, secondColumnObjName).set(columnValue.id);
  }
};

export const onDropCard = (props: OnDropCardProps) => {
  const {
    e,
    taskValue,
    currentCard,
    uid,
    deskObjName,
    columnObjName,
    firebase,
  } = props;

  if (e.currentTarget.getAttribute('draggable') === 'true' && currentCard.taskName) {
    const firstTaskObjName = taskValue.taskName.split(' ').join('');
    const secondTaskObjName = currentCard.taskName.split(' ').join('');

    firebase
      .taskId(uid, deskObjName, columnObjName, firstTaskObjName)
      .set(currentCard.id);
    firebase
      .taskId(uid, deskObjName, columnObjName, secondTaskObjName)
      .set(taskValue.id);
  }
};
