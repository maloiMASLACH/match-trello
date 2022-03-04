import { DropColumnProps, DropTaskProps } from '../../types/dragAndDrop';
import { ColumnType, TaskType } from '../../types/globalTypes';
import Firebase from '../fireBase';

export const onDragStart = (
  card: any,
  setCurrentCard: React.Dispatch<React.SetStateAction<any>>,
) => {
  setCurrentCard(card);
  return null;
};
export const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  return null;
};
export const onDropColumn = (
  card: ColumnType,
  currentCard: ColumnType,
  uid: string,
  deskObjName:string,
  firebase:Firebase,
) => {
  const firstColumnObjName = card.columnName.split(' ').join('');
  const secondColumnObjName = currentCard.columnName.split(' ').join('');

  firebase.columnId(uid, deskObjName, firstColumnObjName).set(currentCard.id);
  firebase.columnId(uid, deskObjName, secondColumnObjName).set(card.id);
};

export const onDropCard = (
  card: TaskType,
  currentCard: TaskType,
  uid:string,
  deskObjName:string,
  columnObjName:string,
  firebase:Firebase,
) => {
  const firstTaskObjName = card.taskName.split(' ').join('');
  const secondTaskObjName = currentCard.taskName.split(' ').join('');

  firebase.taskId(uid, deskObjName, columnObjName, firstTaskObjName).set(currentCard.id);
  firebase.taskId(uid, deskObjName, columnObjName, secondTaskObjName).set(card.id);
};
