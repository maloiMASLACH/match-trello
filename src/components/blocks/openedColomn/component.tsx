import React, { useContext, useState } from 'react';
import { OpenedColumnProps, TaskType } from '../../../types';
import { ColumnValueContext, sortByPosition, TaskValueContext } from '../../../utils';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid } = props;

  const columnValue = useContext(ColumnValueContext);

  const [currentTask, setCurrentTask] = useState<TaskType>({
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

  const sortedColumns = Object.values(columnValue.tasks || []).sort(
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
