import { ColumnType, UserType } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface OpenedColumnProps {
  column: ColumnType;
  deskName: string;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  setOpenColumn: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ChangeNameFieldProps {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  columnName: string;
}
