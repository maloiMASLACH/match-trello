import { User } from '../../types/globalTypes';
import Firebase from '../fireBase';

export const onDragStart = (
  card: any,
  setCurrentCard: React.Dispatch<React.SetStateAction<any>>,
) => {
  setCurrentCard(card);
  return null;
};
export const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => null;
export const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => null;
export const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  return null;
};
export const onDropColumn = (
  card: any,
  currentCard: any,
  deskName: string,
  userState: User,
  firebase: Firebase,
) => {
  const draggableName = currentCard.columnName.split(' ').join('_');
  const targetName = card.columnName.split(' ').join('_');
  const changedObj = userState;

  const newId = userState.desks[deskName].columns[targetName].id;
  const oldId = userState.desks[deskName].columns[draggableName].id;

  changedObj.desks[deskName].columns[draggableName].id = newId;
  changedObj.desks[deskName].columns[targetName].id = oldId;

  firebase.user(userState.uid.slice(1)).set(userState);
  return null;
};

export const onDropCard = function (
  card: any,
  currentCard: any,
  deskName: string,
  columnName: string,
  userState: User,
  firebase: Firebase,
) {
  const draggableName = currentCard.taskName.split(' ').join('_');
  const targetName = card.taskName.split(' ').join('_');
  const changedObj = userState;
  const newId = userState.desks[deskName].columns[columnName].tasks[targetName].id;
  const oldId = userState.desks[deskName].columns[columnName].tasks[draggableName].id;
  changedObj.desks[deskName].columns[columnName].tasks[draggableName].id = newId;
  changedObj.desks[deskName].columns[columnName].tasks[targetName].id = oldId;
  firebase.user(userState.uid.slice(1)).set(userState);
  return null;
};
