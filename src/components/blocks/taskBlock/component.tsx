import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import './styles.css';
import { TextColor } from '../../../constants';
import { TaskProps } from '../../../types';
import {
  FirebaseContext, TaskValueContext, onDragOver, onDropCard,
} from '../../../utils';
import { RedactImg, DeleteImg } from '../../controls/images';
import ChangeTaskField from './components/changeNameField/component';

const Task = (props: TaskProps) => {
  const { currentCard, setCurrentCard } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const taskAddress = {
    uid: taskValue.assignedById,
    deskObjId: Number(taskValue.deskObjId),
    columnObjId: Number(taskValue.columnObjId),
    taskObjId: taskValue.id,
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .taskCompleted(taskAddress)
      .set(!taskValue.completed);
  };

  const deleteTask = () => {
    firebase
      .task(taskAddress)
      .set(null);
  };

  return (
    <div
      className={clsx('task', `${!isChanging}`)}
      style={{ background: TextColor[taskValue.forUser.split('')[0]] }}
      onDragStart={() => {
        setCurrentCard(taskValue);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDropCard({
        e,
        card: taskValue,
        currentCard,
        uid: taskValue.assignedById,
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
            <p className="assigned">
              {taskValue.forUser && 'Assigned to:'}
              <p className="bolder">{taskValue.forUser}</p>
            </p>
            <p className="assigned">
              {taskValue.forUser && 'By:'}
              <p className="bolder">{taskValue.assignedBy}</p>
            </p>
            <p>{taskValue.description || 'No description'}</p>
          </p>
        </>
      ) : (
        <ChangeTaskField handleChanging={handleChanging} />
      )}
    </div>
  );
};

export default Task;
