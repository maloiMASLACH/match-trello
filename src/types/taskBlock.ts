import { TaskType } from './globalTypes';

export interface TaskProps {
  currentCard: TaskType;
  setCurrentCard: (el: TaskType) => void;
}
