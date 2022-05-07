import { ChangeEvent } from 'react';

export interface PageWithUserProps extends UserPageProps {
  isVerified:boolean,
  userID: string,
}

export interface UserPageProps {
  handleTheme: (el:ChangeEvent<HTMLSelectElement>)=>void
}
