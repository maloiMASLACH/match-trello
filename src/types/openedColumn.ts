import { ColumnType, User } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface OpenedColumnProps {
  column: ColumnType;
  deskName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  setOpenColumn: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  columnName: string;
  firebase: Firebase;
}
