import { TaskType, UserType } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface TaskProps {
  columnName: string;
  taskInfo: TaskType;
  deskName: string;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  currentCard: TaskType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
export interface ChangeNameFieldProps {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  columnName: string;
  taskName: string;
}
