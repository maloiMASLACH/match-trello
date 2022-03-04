import { UserType } from '../../types/globalTypes';
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
  card: any,
  currentCard: any,
  deskName: string,
  userState: UserType,
  firebase: Firebase,
) => {
  const draggableName = currentCard.columnName.split(' ').join('_');
  const targetName = card.columnName.split(' ').join('_');
  const deskNameObj = deskName.split(' ').join('_');
  const changedObj = userState;

  const newId = userState.desks[deskNameObj as any]!.columns[targetName]!.id;
  const oldId = userState.desks[deskNameObj as any]!.columns[draggableName]!.id;

  changedObj.desks[deskNameObj as any]!.columns[draggableName as any]!.id = newId;
  changedObj.desks[deskNameObj as any]!.columns[targetName as any]!.id = oldId;

  firebase.user(userState.uid.slice(1)).set(userState);
  return null;
};

export const onDropCard = function (
  card: any,
  currentCard: any,
  deskName: string,
  columnName: string,
  userState: UserType,
  firebase: Firebase,
) {
  const draggableName = currentCard.taskName.split(' ').join('_');
  const targetName = card.taskName.split(' ').join('_');
  const changedObj = userState;
  const deskNameObj = deskName.split(' ').join('_');

  const newId = userState.desks[deskNameObj as any]!
    .columns[columnName as any]!.tasks[targetName]!.id;

  const oldId = userState.desks[deskNameObj as any]!
    .columns[columnName as any]!.tasks[draggableName]!.id;

  changedObj.desks[deskNameObj as any]!
    .columns[columnName as any]!.tasks[draggableName]!.id = newId;

  changedObj.desks[deskNameObj as any]!.columns[columnName as any]!.tasks[targetName]!.id = oldId;

  firebase.user(userState.uid.slice(1)).set(userState);

  return null;
};
