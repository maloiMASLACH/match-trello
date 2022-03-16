import { TaskType } from './globalTypes';

export interface TaskProps {
  uid: string;
  columnObjName: string;
  deskObjName: string;
  currentCard: TaskType;
  setCurrentCard: (el: TaskType) => void;
}
