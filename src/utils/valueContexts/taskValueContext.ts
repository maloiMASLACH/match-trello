import React from 'react';
import { voidTask } from '../../constants';
import { TaskType } from '../../types';

const TaskValueContext = React.createContext<TaskType>(voidTask);

export default TaskValueContext;
