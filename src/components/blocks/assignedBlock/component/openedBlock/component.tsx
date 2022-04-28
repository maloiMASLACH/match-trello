import React, { useState } from 'react';
import { OpenedAssignedBlockProps } from '../../../../../types/assignedTask';
import { TaskType } from '../../../../../types/globalTypes';
import { sortByPosition } from '../../../../../utils/sortCards';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import Task from '../../../taskBlock';
import './styles.css';

const OpenedAssignBlock = (props: OpenedAssignedBlockProps) => {
  const { assignments } = props;

  const [isOpen, setOpenColumn] = useState<boolean>(true);

  const handleActive = () => {
    setOpenColumn((prevState) => !prevState);
  };

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

  return (
    <div className="assignments">
      {Object.values(assignments || {}).map(
        (appointee) => appointee.tasks && (
        <div key={appointee.user} className="appointee">
          <div className="appointeeHead">
            <h4>{appointee.user}</h4>
            <i
              className="fa fa-eye table"
              aria-hidden="true"
              onClick={handleActive}
            />
          </div>

          <div className="assignTasks">
            {isOpen ? (
              Object.values(appointee.tasks || {})
                .sort(sortByPosition)
                .map((task) => (
                  <TaskValueContext.Provider key={task.id} value={task}>
                    <Task
                      currentCard={currentTask}
                      setCurrentCard={setCurrentTask}
                    />
                  </TaskValueContext.Provider>
                ))
            ) : (
              <p className="assignLength">
                {`${
                  Object.keys(appointee.tasks || {}).length
                } task(s)`}
              </p>
            )}
          </div>
        </div>
        ),
      )}
    </div>
  );
};

export default OpenedAssignBlock;
