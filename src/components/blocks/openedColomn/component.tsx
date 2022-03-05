import React, { useContext, useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import ChangeNameField from './components/changeNameField';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import { HandleOpened } from '../../../types/toggle';

const OpenedColumn = (props: HandleOpened) => {
  const { handleOpened } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);
  const columnValue = useContext(ColumnValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const deleteColumn = () => {
    const deskObjName = deskValue?.deskName.split(' ').join('');
    const columnObjName = columnValue?.columnName.split(' ').join('');
    firebase!.column(userValue!.uid, deskObjName!, columnObjName!).set(null);
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  return (
    <div className="openedColonBlock">
      <div className="openedColonBlockHead">
        <h3>
          {!isChanging && columnValue!.columnName}
          {isChanging && <ChangeNameField handleChanging={handleChanging} />}
        </h3>
        <img
          src="./redact.png"
          className="deskDelete"
          alt="x"
          onClick={() => {
            setChanging(!isChanging);
          }}
          aria-hidden="true"
        />
        <img
          className="deskDelete"
          alt="delete"
          src="./delete.png"
          onClick={() => deleteColumn()}
          aria-hidden="true"
        />
        <img
          src="./x.png"
          alt="x"
          onClick={() => {
            handleOpened();
          }}
          aria-hidden="true"
        />
      </div>
      <div className="tasks">
        {columnValue!.tasks
          ? Object.values(columnValue!.tasks)
            .sort(sortCards)
            .map((task: TaskType | null) => (
              <TaskValueContext.Provider value={task}>
                <Task
                  currentCard={currentTask}
                  setCurrentCard={(newTask) => setCurrentTask(newTask)}
                />
              </TaskValueContext.Provider>
            ))
          : null}
        <NewTask />
      </div>
    </div>
  );
};

export default OpenedColumn;
