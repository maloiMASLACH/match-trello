import { ColumnType, DeskType, TaskType } from '../../types/globalTypes';
import { RequestType } from '../../types/requestPage';

export const sortCards = (
  a: DeskType | ColumnType | TaskType | RequestType,
  b: DeskType | ColumnType | TaskType | RequestType,
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
