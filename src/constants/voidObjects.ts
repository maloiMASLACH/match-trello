import {
  AuthUserType,
  ColumnType,
  DeskType,
  TaskType,
  UserType,
} from '../types';

export const voidTask: TaskType = {
  taskName: '',
  date: '',
  id: 0,
  position: 0,
  forUser: '',
  forUserId: '',
  assignedBy: '',
  assignedById: '',
  deskObjId: '',
  columnObjId: '',
  description: '',
  completed: false,
};

export const voidColumn: ColumnType = {
  tasks: [],
  columnName: '',
  id: 0,
  deskObjId: '',
  position: 0,
};

export const voidDesk: DeskType = {
  columns: {},
  id: 0,
  deskName: '',
};

export const voidUser: UserType = {
  desks: [],
  mail: '',
  name: '',
  isAdmin: false,
  uid: '',
};

export const voidAuthUser: AuthUserType = {
  isVerified: false,
  isAdmin: false,
  userId: '',
  userMail: '',
};
