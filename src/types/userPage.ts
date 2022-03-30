import { ChangeEvent } from 'react';

export interface PageWithUserProps {
  isVerified:boolean,
  userID: string,
  handleTheme: (el:ChangeEvent<HTMLSelectElement>)=>void
}
export interface UserPageProps {
  handleTheme: (el:ChangeEvent<HTMLSelectElement>)=>void
}
