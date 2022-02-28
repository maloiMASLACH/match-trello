import { DeskType, User } from './globalTypes';

export interface DeskWithInfoProps {
  deskInfo: DeskType;
  deskName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
