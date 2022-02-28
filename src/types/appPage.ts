import Firebase from '../utils/fireBase';

export interface AppPageProps {
  path: string;
}

export interface PageWithUserProps {
  firebase: Firebase;
  path: string;
}
