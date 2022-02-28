import { User } from './globalTypes';

export interface NewTaskProps {
  userState: User;
  deskName: string;
  columnName: string;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
export interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddFormProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
  columnName: string;
}
