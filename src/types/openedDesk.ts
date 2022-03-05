import { ColumnType } from './globalTypes';

export interface ColumnProps {
  currentCard: ColumnType | null;
  setCurrentCard: (el:ColumnType) => void;
}
