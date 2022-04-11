import { TaskType } from './globalTypes';

export interface TaskProps {
  uid: string;
  columnObjId: number;
  deskObjId: number;
  currentCard: TaskType;
  setCurrentCard: (el: TaskType) => void;
}
