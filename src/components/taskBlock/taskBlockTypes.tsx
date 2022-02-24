import { TaskType, User } from '../../constants/interfaces';
import Firebase from '../../utils/fireBase';

export interface TaskProps {
  colonName: string;
  taskInfo: TaskType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  currentCard: TaskType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  colonName: string;
  taskName: string;
  firebase: Firebase;
}
