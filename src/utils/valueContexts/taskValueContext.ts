import React from 'react';
import { TaskType } from '../../types/globalTypes';

const TaskValueContext = React.createContext<TaskType | null>(null);

export default TaskValueContext;
