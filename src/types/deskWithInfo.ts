import { DeskType, UserType } from './globalTypes';

export interface DeskWithInfoProps {
  deskInfo: DeskType;
  deskName: string;
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
}
