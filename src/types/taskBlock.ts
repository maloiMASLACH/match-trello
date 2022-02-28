import { TaskType, User } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface TaskProps {
  columnName: string;
  taskInfo: TaskType;
  deskName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  currentCard: TaskType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  columnName: string;
  taskName: string;
  firebase: Firebase;
}
