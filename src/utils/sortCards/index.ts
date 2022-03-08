import { ColumnType, DeskType, TaskType } from '../../types/globalTypes';

const sortCards = (a: DeskType | ColumnType | TaskType, b: DeskType | ColumnType | TaskType) => {
  if (a.id > b.id) {
    return 1;
  }
  return -1;
};
export default sortCards;
