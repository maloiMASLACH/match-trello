import React, { useContext, useState } from 'react';
import './styles.css';
import { RequestTaskProps } from '../../../types/requestPage';
import ChangeRequestTaskField from './components/changeNameField/component';
import { FirebaseContext } from '../../../utils/fireBase';
import RequesterContext from '../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../utils/valueContexts/senderContext';
import ActiveImg from '../../controls/activeImg';

const RequestTask = (props: RequestTaskProps) => {
  const { task, received, currentId } = props;

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const { senderId, receiverId } = {
    senderId: received ? currentId : receiver.key.slice(1),
    receiverId: received ? requester.key.slice(1) : currentId,
  };

  const setCompleted = () => {
    firebase
      .setRequestComplete(
        senderId,
        receiverId,
        task.id,
      )
      .set(!task.completed);
  };

  const deleteTask = () => {
    firebase
      .sendRequest(
        senderId,
        receiverId,
        task.id,
      )
      .set(null)
      .then(() => {
        firebase
          .sendedTask(
            receiverId,
            senderId,
            task.id,
          )
          .set(null);
      });
  };

  return (
    <div className={`task ${!isChanging}`}>
      {!isChanging ? (
        <>
          <div className="tools">
            <ActiveImg
              src="./../redact.png"
              alt="redact"
              className="taskRedact"
              onClick={handleChanging}
            />
            <input
              className="taskCheckBox"
              type="checkbox"
              checked={task.completed}
              id={task.taskName + task.id}
              onChange={setCompleted}
            />
            <label htmlFor={task.taskName + task.id}>
              <input type="checkbox" id="rule" />
              <div id="tick_mark" />
            </label>
            <ActiveImg
              src="./../delete.png"
              alt="delete"
              className="taskDelete"
              onClick={deleteTask}
            />
          </div>
          <div className="upperPart">
            <p>{task.taskName}</p>
            <p>{task.date}</p>
          </div>
          <p className="taskDescription">
            {task.description || 'No description'}
          </p>
        </>
      ) : (
        <ChangeRequestTaskField
          currentId={currentId}
          task={task}
          received={received}
          handleChanging={handleChanging}
        />
      )}
    </div>
  );
};

export default RequestTask;
