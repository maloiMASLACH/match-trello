import React, { useContext, useState } from 'react';
import './styles.css';
import { RequestTaskProps } from '../../../types/requestPage';
import ChangeRequestTaskField from './components/changeNameField/component';
import { FirebaseContext } from '../../../utils/fireBase';
import RequesterContext from '../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../utils/valueContexts/senderContext';

const RequestTask = (props: RequestTaskProps) => {
  const { task, received, uid } = props;

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const taskObjName = task.taskName.split(' ').join('') + task.id;

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .setRequestComplete(
        received ? uid : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid,
        taskObjName,
      )
      .set(!task.completed);
  };

  const deleteTask = () => {
    firebase
      .sendRequest(
        received ? uid : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid,
        taskObjName,
      )
      .set(null)
      .then(() => {
        firebase
          .sendedTask(
            received ? requester.key.slice(1) : uid,
            received ? uid : receiver.key.slice(1),
            taskObjName,
          )
          .set(null);
      });
  };

  return (
    <div className={`task ${!isChanging}`}>
      {!isChanging ? (
        <>
          <p>{task.taskName}</p>
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
            checked={task.completed}
            id={taskObjName}
            onChange={setCompleted}
          />
          <label htmlFor={taskObjName}>
            <input type="checkbox" id="rule" />
            <div id="tick_mark" />
          </label>
          <p>{task.date}</p>
          <p className="taskDescription">
            {task.description || 'No description'}
          </p>
        </>
      ) : (
        <ChangeRequestTaskField
          uid={uid}
          task={task}
          received={received}
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default RequestTask;
