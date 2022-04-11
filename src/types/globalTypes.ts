import { RequestsType } from './requestPage';

export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string,
  id: number;
  position: number;
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
  requests: RequestsType
}

export interface AuthUserType {
  isVerified: boolean;
  isAdmin: boolean;
  userId: string;
}
