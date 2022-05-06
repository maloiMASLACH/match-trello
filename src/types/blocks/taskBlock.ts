import { TaskType } from '../utils/globalTypes';

export interface TaskProps {
  currentCard: TaskType;
  setCurrentCard: (el: TaskType) => void;
}
