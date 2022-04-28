import { ColumnType } from './globalTypes';

export interface ColumnProps {
  uid: string;
  deskObjId: number;
  currentColumn: ColumnType;
  setCurrentColumn: (el: ColumnType) => void;
}
