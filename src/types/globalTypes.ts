import { RequestsType } from './requestPage';

export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string;
  forUser: string;
  forUserId: string;
  id: number;
  position: number;
}

export interface AssignmentType {
  taskName: string;
  date: string;
  id: number;
  fromUser: string;
}

export interface AppointeeType {
  tasks: { [key: string]: AssignmentType };
  from: string;
  id: string;
}

export interface ColumnType {
  tasks: { [key: number]: TaskType };
  columnName: string;
  id: number;
  position: number;
}
export interface DeskType {
  columns: { [key: number]: ColumnType };
  id: number;
  deskName: string;
}

export interface UserType {
  mail: string;
  name: string;
  uid: string;
  desks: { [key: number]: DeskType };
  requests: RequestsType;
  assignments: { [key: string]: AppointeeType };
}

export interface AuthUserType {
  isVerified: boolean;
  isAdmin: boolean;
  userId: string;
}
