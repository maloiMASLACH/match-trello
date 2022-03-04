import { TaskType } from './globalTypes';

export interface TaskProps {
  currentCard: TaskType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
