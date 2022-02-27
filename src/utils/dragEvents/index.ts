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
export const onDropColon = (
  card: any,
  currentCard: any,
  deckName: string,
  userState: User,
  firebase: Firebase,
) => {
  const draggableName = currentCard.colonName.split(' ').join('_');
  const targetName = card.colonName.split(' ').join('_');
  const changedObj = userState;

  const newId = userState.decks[deckName].colons[targetName].id;
  const oldId = userState.decks[deckName].colons[draggableName].id;

  changedObj.decks[deckName].colons[draggableName].id = newId;
  changedObj.decks[deckName].colons[targetName].id = oldId;

  firebase.user(userState.uid.slice(1)).set(userState);
  return null;
};

export const onDropCard = function (
  card: any,
  currentCard: any,
  deckName: string,
  colonName: string,
  userState: User,
  firebase: Firebase,
) {
  const draggableName = currentCard.taskName.split(' ').join('_');
  const targetName = card.taskName.split(' ').join('_');
  const changedObj = userState;
  const newId = userState.decks[deckName].colons[colonName].tasks[targetName].id;
  const oldId = userState.decks[deckName].colons[colonName].tasks[draggableName].id;
  changedObj.decks[deckName].colons[colonName].tasks[draggableName].id = newId;
  changedObj.decks[deckName].colons[colonName].tasks[targetName].id = oldId;
  firebase.user(userState.uid.slice(1)).set(userState);
  return null;
};
