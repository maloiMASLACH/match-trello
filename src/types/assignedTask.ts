import { TaskType } from './globalTypes';

export interface AppointeeType {
  tasks: TaskType[];
  user: string;
  userId: string
}

export interface AssignedBlockProps {
  assignments: AppointeeType[];
}
