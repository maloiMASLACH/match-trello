import React, { useContext, useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import { sortByPosition } from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import { OpenedColumnProps } from '../../../types/openedColumn';
import AuthUserContext from '../../../utils/sessionHandler';
import { taskChecker } from '../../../utils/assignedChecker';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid, deskObjId, isSwitched } = props;

  const columnValue = useContext(ColumnValueContext);
  const { userMail } = useContext(AuthUserContext);

  const [currentTask, setCurrentTask] = useState<TaskType>({
    taskName: '',
    date: '',
    id: 0,
    position: 0,
    forUser: '',
    forUserId: '',
    assignedBy: '',
    description: '',
    completed: false,
  });

  const sortedColumns = Object.values(columnValue.tasks || []).sort(
    sortByPosition,
  );

  const yourColumns = !isSwitched
    ? sortedColumns
    : taskChecker(sortedColumns, userMail);

  return (
    <div className="openedColonBlock">
      <div className="tasks">
        {yourColumns.map((task: TaskType) => (
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
