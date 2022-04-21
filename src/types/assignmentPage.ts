import { AppointeeType } from './globalTypes';

export interface AssignmentPageType {
  userID: string;
}

export interface AssignedBlockProps{
  assignments: { [key: string]: AppointeeType; }
}
