import React, { useContext, useState } from 'react';
import { onDragOver, onDropCard } from '../../../utils/dragEvents';
import { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';
import { TaskProps } from '../../../types/taskBlock';
import ChangeTaskField from './components/changeNameField';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';

const Task = (props: TaskProps) => {
  const {
    uid, columnObjName, deskObjName, currentCard, setCurrentCard,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const taskObjName = taskValue.taskName.split(' ').join('');

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .taskCompleted(uid, deskObjName, columnObjName, taskObjName)
      .set(!taskValue.completed);
  };

  const deleteTask = () => {
    firebase.task(uid, deskObjName, columnObjName, taskObjName).set(null);
  };

  return (
    <div
      className="task"
      onDragStart={() => {
        setCurrentCard(taskValue);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDropCard({
        e,
        taskValue,
        currentCard,
        uid,
        deskObjName,
        columnObjName,
        firebase,
      })}
      draggable={!isChanging}
    >
      {!isChanging ? (
        <>
          <p>{taskValue.taskName}</p>
          <img
            src="./../redact.png"
            className="taskRedact"
            alt="x"
            onClick={handleChanging}
            aria-hidden="true"
          />
          <img
            className="taskDelete"
            alt="delete"
            src="./../delete.png"
            onClick={deleteTask}
            aria-hidden="true"
          />
          <input
            className="taskCheckBox"
            type="checkbox"
            checked={taskValue.completed}
            id={taskValue.taskName}
            onChange={setCompleted}
          />
          <label htmlFor={taskValue.taskName}>
            <input type="checkbox" id="rule" />
            <div id="tick_mark" />
          </label>
          <p>{taskValue.date}</p>
        </>
      ) : (
        <ChangeTaskField
          uid={uid}
          deskObjName={deskObjName}
          columnObjName={columnObjName}
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default Task;
