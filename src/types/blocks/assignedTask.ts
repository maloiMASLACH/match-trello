import { TaskType } from '../utils/globalTypes';

export interface AppointeeType {
  tasks: TaskType[];
  user: string;
  userId: string
}

export interface AssignedBlockProps {
  assignments: AppointeeType[];
  isActive: boolean;
  handleActive: () => void;
}

export interface OpenedHeadProps {
  handleOpen: () => void;
}

export interface OpenedAssignedBlockProps {
  assignments: AppointeeType[];
}
