import React, { useContext, useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import { sortByPosition } from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import { OpenedColumnProps } from '../../../types/openedColumn';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid, deskObjId } = props;

  const columnValue = useContext(ColumnValueContext);

  const [currentTask, setCurrentTask] = useState<TaskType>({
    taskName: '',
    date: '',
    id: 0,
    position: 0,
    forUser: '',
    forUserId: '',
    description: '',
    completed: false,
  });

  const sortedColumns = Object.values(columnValue.tasks || []).sort(
    sortByPosition,
  );

  return (
    <div className="openedColonBlock">
      <div className="tasks">
        {sortedColumns.map((task: TaskType) => (
          <TaskValueContext.Provider key={task.id} value={task}>
            <Task
              uid={uid}
              deskObjId={deskObjId}
              columnObjId={columnValue.id}
              currentCard={currentTask}
              setCurrentCard={setCurrentTask}
            />
          </TaskValueContext.Provider>
        ))}
        <NewTask uid={uid} deskObjId={deskObjId} />
      </div>
    </div>
  );
};

export default OpenedColumn;
