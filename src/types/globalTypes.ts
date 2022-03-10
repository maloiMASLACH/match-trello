export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  id: number;
}
export interface ColumnType {
  tasks: { [key: number]: TaskType };
  columnName: string;
  id: number;
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
}

export interface AuthUserType {
  isAdmin: boolean;
  uid: string;
}
