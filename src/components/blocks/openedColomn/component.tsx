import React, { useContext, useState } from 'react';
import { voidTask } from '../../../constants';
import { OpenedColumnProps, TaskType } from '../../../types';
import { ColumnValueContext, sortByPosition, TaskValueContext } from '../../../utils';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid } = props;

  const { tasks } = useContext(ColumnValueContext);

  const [currentTask, setCurrentTask] = useState<TaskType>(voidTask);

  const sortedColumns = Object.values(tasks || []).sort(
    sortByPosition,
  );

  const xScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      top: e.currentTarget.scrollTop += e.deltaY * 0.2,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="openedColonBlock">
      <div className="tasks" onWheel={xScroll}>
        {sortedColumns.map((task: TaskType) => (
          <TaskValueContext.Provider key={task.id} value={task}>
            <Task
              currentCard={currentTask}
              setCurrentCard={setCurrentTask}
            />
          </TaskValueContext.Provider>
        ))}
        <NewTask uid={uid} />
      </div>
    </div>
  );
};

export default OpenedColumn;
