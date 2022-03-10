import { ColumnType } from './globalTypes';

export interface ColumnProps {
  uid: string;
  deskObjName: string;
  currentColumn: ColumnType;
  setCurrentColumn: (el: ColumnType) => void;
}
