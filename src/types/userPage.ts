import { UserType } from './globalTypes';
import Firebase from '../utils/fireBase';

export interface PageWithUserProps {
  user: UserType;
  firebase: Firebase;
}

export interface UserPageBlockRenderProps {
  userInfo: UserType | null;
}
