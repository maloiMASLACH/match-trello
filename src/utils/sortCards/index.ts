import { DeskType, ColumnType, TaskType } from '../../types';

export const sortCards = (
  a: DeskType | ColumnType | TaskType,
  b: DeskType | ColumnType | TaskType,
) => {
  if (a.id > b.id) {
    return 1;
  }
  return -1;
};

export const sortByPosition = (
  a:TaskType | ColumnType,
  b:TaskType | ColumnType,
) => {
  if (a.position > b.position) {
    return 1;
  }
  return -1;
};

export const invertSort = (
  a:TaskType | ColumnType,
  b:TaskType | ColumnType,
) => {
  if (a.position > b.position) {
    return -1;
  }
  return 1;
};
export default sortCards;
