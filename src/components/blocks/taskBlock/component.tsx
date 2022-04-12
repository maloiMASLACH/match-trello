import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { onDragOver, onDropCard } from '../../../utils/dragEvents';
import { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';
import { TaskProps } from '../../../types/taskBlock';
import ChangeTaskField from './components/changeNameField';
import TaskValueContext from '../../../utils/valueContexts/taskValueContext';
import RedactImg from '../../controls/images/redact';
import DeleteImg from '../../controls/images/delete';

const Task = (props: TaskProps) => {
  const {
    uid, columnObjId, deskObjId, currentCard, setCurrentCard,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .taskCompleted(uid, deskObjId, columnObjId, taskValue.id)
      .set(!taskValue.completed);
  };

  const deleteTask = () => {
    firebase.task(uid, deskObjId, columnObjId, taskValue.id).set(null);
  };

  return (
    <div
      className={clsx('task', `${!isChanging}`)}
      onDragStart={() => {
        setCurrentCard(taskValue);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDropCard({
        e,
        taskValue,
        currentCard,
        uid,
        deskObjId,
        columnObjId,
        firebase,
      })}
      draggable={!isChanging}
    >
      {!isChanging ? (
        <>
          <div className="tools">
            <RedactImg className="taskRedact" onClick={handleChanging} />
            <input
              className="taskCheckBox"
              type="checkbox"
              checked={taskValue.completed}
              id={taskValue.taskName + taskValue.id}
              onChange={setCompleted}
            />
            <label htmlFor={taskValue.taskName + taskValue.id}>
              <input type="checkbox" id="rule" />
              <div id="tick_mark" />
            </label>
            <DeleteImg className="taskDelete" onClick={deleteTask} />
          </div>
          <div className="upperPart">
            <p>{taskValue.taskName}</p>
            <p>{taskValue.date}</p>
          </div>
          <p className="taskDescription">
            {taskValue.description || 'No description'}
          </p>
        </>
      ) : (
        <ChangeTaskField
          uid={uid}
          deskObjId={deskObjId}
          columnObjId={columnObjId}
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default Task;
