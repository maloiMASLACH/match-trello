import { TaskType } from './globalTypes';

export interface TaskProps {
  currentCard: TaskType | null;
  setCurrentCard: (el:TaskType) => void;
}
