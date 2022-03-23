import React, { useContext, useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import ChangeNameField from './components/changeNameField';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import { OpenedColumnProps } from '../../../types/openedColumn';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid, deskObjName, handleOpened } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType>({
    taskName: '',
    date: '',
    id: 0,
    completed: false,
  });

  const columnObjName = columnValue.columnName.split(' ').join('');

  const sortedColumns = Object.values(columnValue.tasks || []).sort(sortCards);

  const deleteColumn = () => {
    firebase.column(uid, deskObjName, columnObjName).set(null);
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  return (
    <div className="openedColonBlock">
      <div className="openedColonBlockHead">
        {isChanging ? (
          <ChangeNameField
            uid={uid}
            deskObjName={deskObjName}
            handleChanging={handleChanging}
          />
        ) : (<h3>{columnValue.columnName}</h3>)}
        <div className="toolImg">
          <img
            src="./../redact.png"
            className="deskDelete"
            alt="x"
            onClick={handleChanging}
            aria-hidden="true"
          />
          <img
            className="deskDelete"
            alt="delete"
            src="./../delete.png"
            onClick={deleteColumn}
            aria-hidden="true"
          />
          <img
            src="./../x.png"
            alt="x"
            onClick={handleOpened}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="tasks">
        {sortedColumns
          .map((task: TaskType) => (
            <TaskValueContext.Provider key={task.id} value={task}>
              <Task
                uid={uid}
                deskObjName={deskObjName}
                columnObjName={columnObjName}
                currentCard={currentTask}
                setCurrentCard={setCurrentTask}
              />
            </TaskValueContext.Provider>
          ))}
        <NewTask uid={uid} deskObjName={deskObjName} />
      </div>
    </div>
  );
};

export default OpenedColumn;
