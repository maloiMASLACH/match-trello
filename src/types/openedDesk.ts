import { ColumnType } from './globalTypes';

export interface ColumnProps {
  currentCard: ColumnType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<ColumnType | null>>;
}
