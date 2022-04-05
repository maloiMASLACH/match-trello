import React from 'react';
import { TaskType } from '../../types/globalTypes';

const TaskValueContext = React.createContext<TaskType>({
  taskName: '',
  date: '',
  id: 0,
  description: '',
  completed: false,
});

export default TaskValueContext;
