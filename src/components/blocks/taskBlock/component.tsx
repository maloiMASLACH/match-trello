import React, { useContext, useState } from 'react';
import { onDragOver, onDragStart, onDropCard } from '../../../utils/dragEvents';
import { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';
import { TaskProps } from '../../../types/taskBlock';
import ChangeNameField from './components/changeNameField';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import ColumnValueContext from '../../../utils/valueContexts/columnValueContext';

const Task = (props: TaskProps) => {
  const { currentCard, setCurrentCard } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);
  const columnValue = useContext(ColumnValueContext);
  const taskValue = useContext(TaskValueContext);

  const deskObjName = deskValue!.deskName.split(' ').join('');
  const columnObjName = columnValue!.columnName.split(' ').join('');
  const taskObjName = taskValue!.taskName.split(' ').join('');

  const [checked, setChecked] = useState<boolean>(taskValue!.completed);
  const [isChanging, setChanging] = useState<boolean>(false);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase!
      .taskCompleted(userValue!.uid, deskObjName, columnObjName, taskObjName)
      .set(!checked);

    setChecked(!checked);
  };

  const deleteTask = () => {
    firebase!
      .task(userValue!.uid, deskObjName, columnObjName, taskObjName)
      .set(null);
  };

  return (
    <div
      className="task"
      onDragStart={() => {
        onDragStart(taskValue, setCurrentCard);
      }}
      onDragOver={(e) => onDragOver(e)}
      onDrop={() => onDropCard(taskValue, currentCard)}
      draggable
    >
      {!isChanging && (
        <>
          <p>{taskValue!.taskName}</p>
          <img
            src="./redact.png"
            className="taskRedact"
            alt="x"
            onClick={() => {
              setChanging(!isChanging);
            }}
            aria-hidden="true"
          />
          <img
            className="taskDelete"
            alt="delete"
            src="./delete.png"
            onClick={() => deleteTask()}
            aria-hidden="true"
          />
          <input
            className="taskCheckBox"
            type="checkbox"
            checked={checked}
            id={taskValue!.taskName}
            onChange={() => setCompleted()}
          />
          <label htmlFor={taskValue!.taskName}>
            <input type="checkbox" id="rule" />
            <div id="tick_mark" />
          </label>
          <p>{taskValue!.date}</p>
        </>
      )}
      {isChanging ? <ChangeNameField handleChanging={handleChanging} /> : null}
    </div>
  );
};

export default Task;
