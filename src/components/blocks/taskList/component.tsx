import React from 'react';
import './styles.css';
import RequestTask from '../requestTask';
import { TaskListProps } from '../../../types/requestPage';

const TaskList = (props: TaskListProps) => {
  const { tasks, currentId, received } = props;

  return (
    <>
      {Object.values(tasks || []).map((task) => (
        <RequestTask
          task={task}
          received={received}
          key={task.id}
          currentId={currentId}
        />
      ))}
    </>
  );
};

export default TaskList;
