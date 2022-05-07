export const voidTask = {
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

export const voidColumn = {
  tasks: [],
  columnName: '',
  id: 0,
  deskObjId: '',
  position: 0,
};

export const voidDesk = {
  columns: {},
  id: 0,
  deskName: '',
};

export const voidUser = {
  desks: [],
  mail: '',
  name: '',
  isAdmin: false,
  uid: '',
};

export const voidAuthUser = {
  isVerified: false,
  isAdmin: false,
  userId: '',
  userMail: '',
};
