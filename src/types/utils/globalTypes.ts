export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string;
  forUser: string;
  forUserId: string;
  assignedBy: string;
  assignedById: string;
  deskObjId: string;
  columnObjId: string;
  id: number;
  position: number;
}

export interface ColumnType {
  tasks: { [key: number]: TaskType };
  columnName: string;
  deskObjId: string;
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
  isAdmin: boolean;
  desks: { [key: number]: DeskType };
}

export interface AuthUserType {
  isVerified: boolean;
  isAdmin: boolean;
  userId: string;
  userMail: string;
}
