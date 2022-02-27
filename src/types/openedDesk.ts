import { DeskType, User, ColumnType } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface OpenedDeskProps {
  deskInfo: DeskType;
  deskName: string;
  setOpenDesk: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
export interface ColumnProps {
  column: ColumnType;
  deskName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  currentCard: ColumnType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<ColumnType | null>>;
  firebase: Firebase;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  firebase: Firebase;
}
