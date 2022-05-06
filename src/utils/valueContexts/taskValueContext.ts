import React from 'react';
import { TaskType } from '../../types';

const TaskValueContext = React.createContext<TaskType>({
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
});

export default TaskValueContext;
