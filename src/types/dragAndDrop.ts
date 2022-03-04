import Firebase from '../utils/fireBase';
import { ColumnType, TaskType } from './globalTypes';

export interface DropColumnProps {
  card: ColumnType;
  currentCard: ColumnType;
  uid: string;
  deskObjName:string;
  firebase:Firebase;
}

export interface DropTaskProps {
  card: TaskType;
  currentCard: TaskType;
  uid:string;
  deskObjName:string;
  columnObjName:string;
  firebase:Firebase;
}
