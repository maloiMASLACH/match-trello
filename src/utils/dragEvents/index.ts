import { ColumnType, DropProps, TaskType } from '../../types';

export const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  return null;
};
export const onDropColumn = (props: DropProps<ColumnType>) => {
  const {
    e, card, currentCard, uid, firebase,
  } = props;

  if (
    e.currentTarget.getAttribute('draggable') === 'true'
  ) {
    firebase
      .columnPosition({
        uid,
        deskObjId: Number(card.deskObjId),
        columnObjId: card.id,
      })
      .set(currentCard.position);
    firebase
      .columnPosition({
        uid,
        deskObjId: Number(currentCard.deskObjId),
        columnObjId: currentCard.id,
      })
      .set(card.position);
  }
};

export const onDropCard = (props: DropProps<TaskType>) => {
  const {
    e, card, currentCard, uid, firebase,
  } = props;

  if (
    e.currentTarget.getAttribute('draggable') === 'true'
  ) {
    firebase
      .taskPosition({
        uid,
        deskObjId: Number(card.deskObjId),
        columnObjId: Number(card.columnObjId),
        taskObjId: card.id,
      })
      .set(currentCard.position);
    firebase
      .taskPosition({
        uid,
        deskObjId: Number(currentCard.deskObjId),
        columnObjId: Number(currentCard.columnObjId),
        taskObjId: currentCard.id,
      })
      .set(card.position);
  }
};
