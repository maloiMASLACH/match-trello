import { User } from '../../constants/interfaces';
import Firebase from '../fireBase';

export const onDragStart = function (
  card: any,
  setCurrentCard:React.Dispatch<React.SetStateAction<any>>,
) {
  setCurrentCard(card);
  return (console.log(card.id));
};
export const onDragLeave = function (e:React.DragEvent<HTMLDivElement>) {
  return (null);
};
export const onDragEnd = function (e:React.DragEvent<HTMLDivElement>) {
  return (null);
};
export const onDragOver = function (e:React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  return (null);
};
export const onDropColon = function (
  card: any,
  currentCard:any,
  deckName:string,
  userState:User,
  firebase:Firebase,
) {
  const draggableName = currentCard.colonName.split(' ').join('_');
  const targetName = card.colonName.split(' ').join('_');
  const changedObj = userState;
  const newId = userState.decks[deckName].colons[targetName].id;
  const oldId = userState.decks[deckName].colons[draggableName].id;
  changedObj.decks[deckName].colons[draggableName].id = newId;
  changedObj.decks[deckName].colons[targetName].id = oldId;
  firebase.user(userState.uid.slice(1)).set(userState);
  return (null);
};

export const onDropCard = function (
  card: any,
  currentCard:any,
  deckName:string,
  colonName:string,
  userState:User,
  firebase:Firebase,
) {
  const draggableName = currentCard.taskName.split(' ').join('_');
  const targetName = card.taskName.split(' ').join('_');
  const changedObj = userState;
  const newId = userState.decks[deckName].colons[colonName].tasks[targetName].id;
  const oldId = userState.decks[deckName].colons[colonName].tasks[draggableName].id;
  changedObj.decks[deckName].colons[colonName].tasks[draggableName].id = newId;
  changedObj.decks[deckName].colons[colonName].tasks[targetName].id = oldId;
  firebase.user(userState.uid.slice(1)).set(userState);
  return (null);
};
