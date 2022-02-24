import { User } from '../../../constants/interfaces';
import Firebase from '../../../utils/fireBase';

export interface PageWithUserProps {
  user: User;
  firebase: Firebase;
}

export interface UserPageBlockRenderProps {
  userInfo: User | null;
}
