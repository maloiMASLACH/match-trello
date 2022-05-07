import { UserType } from './globalTypes';

export interface GetUserMailsProps {
  users: { [key: string]: UserType };
  uid: string;
  selectedMail: string
  setUsers: (e: UserType[]) => void;
  setUsersMails: (e: string[]) => void;
  setUserId: (e: number) => void;
}
