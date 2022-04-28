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
import TextColor from '../../../constants/textColors';

const Task = (props: TaskProps) => {
  const {
    currentCard, setCurrentCard,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .taskCompleted(
        taskValue.assignedById,
        Number(taskValue.deskObjId),
        Number(taskValue.columnObjId),
        taskValue.id,
      )
      .set(!taskValue.completed);
  };

  const deleteTask = () => {
    firebase.task(
      taskValue.assignedById,
      Number(taskValue.deskObjId),
      Number(taskValue.columnObjId),
      taskValue.id,
    ).set(null);
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
        taskValue,
        currentCard,
        uid: taskValue.assignedById,
        deskObjId: Number(taskValue.deskObjId),
        columnObjId: Number(taskValue.columnObjId),
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
        <ChangeTaskField
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default Task;
