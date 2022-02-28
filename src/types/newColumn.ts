import { User } from './globalTypes';

export interface NewColumnProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
}
export interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddFormProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deskName: string;
}
