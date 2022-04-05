import React, { useContext, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { RequestTaskProps } from '../../../types/requestPage';
import ChangeRequestTaskField from './components/changeNameField/component';
import { FirebaseContext } from '../../../utils/fireBase';
import RequesterContext from '../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../utils/valueContexts/senderContext';

const RequestTask = (props: RequestTaskProps) => {
  const { task, received } = props;

  const { uid } = useParams();

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const taskObjName = task.taskName.split(' ').join('');

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const setCompleted = () => {
    firebase
      .setRequestComplete(
        received ? uid || '' : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid || '',
        taskObjName,
      )
      .set(!task.completed);
  };

  const deleteTask = () => {
    firebase
      .sendRequest(
        received ? uid || '' : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid || '',
        taskObjName,
      )
      .set(null)
      .then(() => {
        firebase
          .sendedTask(
            received ? requester.key.slice(1) : uid || '',
            received ? uid || '' : receiver.key.slice(1),
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
            id={task.taskName}
            onChange={setCompleted}
          />
          <label htmlFor={task.taskName}>
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
          task={task}
          received={received}
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default RequestTask;
