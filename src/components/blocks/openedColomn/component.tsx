import React, { useContext, useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import { sortByPosition } from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import ChangeNameField from './components/changeNameField';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import { OpenedColumnProps } from '../../../types/openedColumn';
import ActiveImg from '../../controls/activeImg';

const OpenedColumn = (props: OpenedColumnProps) => {
  const { uid, deskObjId, handleOpened } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType>({
    taskName: '',
    date: '',
    id: 0,
    position: 0,
    description: '',
    completed: false,
  });

  const sortedColumns = Object.values(columnValue.tasks || []).sort(sortByPosition);

  const deleteColumn = () => {
    firebase.column(uid, deskObjId, columnValue.id).set(null);
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
            deskObjId={deskObjId}
            handleChanging={handleChanging}
          />
        ) : (<h3>{columnValue.columnName}</h3>)}
        <div className="toolImg">
          <ActiveImg
            src="./../redact.png"
            alt="redact"
            className="deskDelete"
            onClick={handleChanging}
          />
          <ActiveImg
            src="./../delete.png"
            alt="delete"
            className="deskDelete"
            onClick={deleteColumn}
          />
          <ActiveImg
            src="./../x.png"
            alt="x"
            className="deskDelete"
            onClick={handleOpened}
          />
        </div>
      </div>
      <div className="tasks">
        {sortedColumns
          .map((task: TaskType) => (
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
