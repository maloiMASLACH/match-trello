import {
  DeskType, ColumnType, UserType,
} from './globalTypes';
import Firebase from '../utils/fireBase';

export interface OpenedDeskProps {
  deskInfo: DeskType;
  deskName: string;
  setOpenDesk: React.Dispatch<React.SetStateAction<boolean>>;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
}
export interface ColumnProps {
  column: ColumnType;
  deskName: string;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  currentCard: ColumnType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<ColumnType | null>>;
}
export interface ChangeNameFieldProps {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
}
