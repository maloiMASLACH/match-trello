import { UserType } from './globalTypes';

export interface NewColumnProps {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
}
export interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddFormProps {
  handleActive: () => void;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
}
