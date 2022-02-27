import { ColonType, User } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface OpenedColonProps {
  colon: ColonType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  setOpenColon: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  colonName: string;
  firebase: Firebase;
}
