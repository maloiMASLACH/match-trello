import { User } from '../../constants/interfaces';

export interface NewDeckProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
export interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddFormProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
