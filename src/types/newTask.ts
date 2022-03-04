import { UserType } from './globalTypes';

export interface NewTaskProps {
  userState: UserType;
  deskName: string;
  columnName: string;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
}
export interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddFormProps {
  handleActive: () => void;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  deskName: string;
  columnName: string;
}
