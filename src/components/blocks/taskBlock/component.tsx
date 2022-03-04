import React, { useContext, useState } from 'react';
import {
  onDragOver,
  onDragStart,
  onDropCard,
} from '../../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';
import { TaskProps } from '../../../types/taskBlock';
import ChangeNameField from './components/changeNameField';

const Task = (props: TaskProps) => {
  const {
    deskName,
    columnName,
    taskInfo,
    userState,
    setUserState,
    currentCard,
    setCurrentCard,
  } = props;

  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState<boolean>(taskInfo.completed);
  const [isChanging, setChanging] = useState<boolean>(false);
  const columnObj = columnName.split(' ').join('_');

  const setCompleted = () => {
    const newState = userState;
    newState.desks[deskName as any]!.columns[columnObj as any]!.tasks[
      taskInfo.taskName as any
    ]!.completed = !checked;

    setUserState(newState);
    setChecked(!checked);

    firebase.user(userState.uid.slice(1)).set(userState);
  };

  const deleteTask = () => {
    const newDesk = userState;
    newDesk.desks[deskName as any]!
      .columns[columnObj as any]!
      .tasks[taskInfo.taskName as any] = null;
    setUserState(newDesk);

    firebase.user(userState.uid.slice(1)).set(userState);
  };

  return (
    <div
      className="task"
      onDragStart={() => {
        onDragStart(taskInfo, setCurrentCard);
      }}
      onDragOver={(e) => onDragOver(e)}
      onDrop={() => onDropCard(
        taskInfo,
        currentCard,
        deskName,
        columnObj,
        userState,
        firebase,
      )}
      draggable
    >
      {!isChanging && (
      <>
        <p>{taskInfo.taskName}</p>
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
          id={taskInfo.taskName}
          onChange={() => setCompleted()}
        />
        <label htmlFor={taskInfo.taskName}>
          <input type="checkbox" id="rule" />
          <div id="tick_mark" />
        </label>
        <p>{taskInfo.date}</p>
      </>
      )}
      {isChanging ? (
        <ChangeNameField
          userState={userState}
          setUserState={setUserState}
          deskName={deskName}
          columnName={columnName}
          taskName={taskInfo.taskName}
          setChanging={setChanging}
        />
      ) : null}
    </div>
  );
};

export default Task;
