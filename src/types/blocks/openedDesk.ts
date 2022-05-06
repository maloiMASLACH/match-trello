import { ColumnType } from '../utils/globalTypes';

export interface ColumnProps {
  uid: string;
  currentColumn: ColumnType;
  setCurrentColumn: (el: ColumnType) => void;
}
