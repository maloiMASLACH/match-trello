import React, { useState } from 'react';
import { voidTask } from '../../../../../constants';
import { OpenedAssignedBlockProps, TaskType } from '../../../../../types';
import { sortByPosition, TaskValueContext } from '../../../../../utils';
import Task from '../../../taskBlock';
import './styles.css';

const OpenedAssignBlock = (props: OpenedAssignedBlockProps) => {
  const { assignments } = props;

  const [isOpen, setOpenColumn] = useState<boolean>(true);

  const handleActive = () => {
    setOpenColumn((prevState) => !prevState);
  };

  const [currentTask, setCurrentTask] = useState<TaskType>(voidTask);

  return (
    <div className="assignments">
      {(assignments || []).map(
        (appointee) => {
          const { user, tasks } = appointee;
          return tasks && (
            <div key={user} className="appointee">
              <div className="appointeeHead">
                <h4>{user}</h4>
                <i
                  className="fa fa-eye table"
                  aria-hidden="true"
                  onClick={handleActive}
                />
              </div>

              <div className="assignTasks">
                {isOpen ? (
                  (tasks || [])
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
                    {`${Object.keys(tasks || {}).length} task(s)`}
                  </p>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default OpenedAssignBlock;
