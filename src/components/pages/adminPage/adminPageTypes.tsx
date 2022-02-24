import { User } from '../../../constants/interfaces';
import Firebase from '../../../utils/fireBase';

export interface AdminPageBLockRenderProps {
  firebase: Firebase;
}
export interface UsersListProps {
  users: User[] | null;
}
