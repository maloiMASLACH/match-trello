import Firebase from '../../utils/fireBase';
import { ColumnType, TaskType } from './globalTypes';

export interface DropColumnProps {
  e: React.DragEvent<HTMLDivElement>;
  columnValue: ColumnType;
  currentColumn: ColumnType;
  uid: string;
  deskObjId: number;
  firebase: Firebase;
}

export interface DropTaskProps {
  e: React.DragEvent<HTMLDivElement>;
  taskValue: TaskType;
  currentCard: TaskType;
  uid: string;
  deskObjId: number;
  columnObjId: number;
  firebase: Firebase;
}

export interface DropProps<CardType> {
  e: React.DragEvent<HTMLDivElement>;
  card: CardType;
  currentCard: CardType;
  uid: string;
  firebase: Firebase;
}
