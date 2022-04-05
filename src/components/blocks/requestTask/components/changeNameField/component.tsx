import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../../../utils/patterns';
import { FirebaseContext } from '../../../../../utils/fireBase';
import './styles.css';
import { ChangeRequestTaskProps } from '../../../../../types/requestPage';
import RequesterContext from '../../../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../../../utils/valueContexts/senderContext';

const ChangeRequestTaskField = (props: ChangeRequestTaskProps) => {
  const { task, received, handleChanging } = props;

  const { uid } = useParams();

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [inputName, setInputName] = useState(task.taskName || '');
  const [inputDate, setInputDate] = useState(task.date || '');
  const [inputDescription, setInputDescription] = useState(
    task.description || '',
  );

  const errorName = validateBlockName(inputName);
  const errorDate = validateBlockName(inputDate);
  const errorDescription = validateDescription(inputDescription.toString());

  const renameTask = () => {
    const taskObjName = task.taskName.split(' ').join('');
    const newTaskObjName = inputName.split(' ').join('');

    firebase
      .sendRequest(
        received ? uid || '' : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid || '',
        taskObjName,
      )
      .set(null);

    task.taskName = inputName;
    task.date = inputDate;
    task.description = inputDescription;

    firebase
      .sendRequest(
        received ? uid || '' : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid || '',
        newTaskObjName,
      )
      .set(task);

    handleChanging();
  };

  return (
    <div className="changeTaskBlock">
      <div className="changeTaskInputBlock">
        <input
          className="newTaskName"
          type="text"
          value={inputName}
          placeholder="Task"
          onChange={(e) => setInputName(e.target.value)}
        />
        <p>{errorName}</p>
      </div>
      <div className="changeTaskInputBlock">
        <input
          className="newTaskName"
          type="text"
          value={inputDate}
          placeholder="Date"
          onChange={(e) => setInputDate(e.target.value)}
        />
        <p>{errorDate}</p>
      </div>
      <div className="changeTaskInputBlock">
        <input
          className="newTaskName"
          type="text"
          value={inputDescription}
          placeholder="Task"
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <p>{errorDescription}</p>
      </div>
      <button
        className="taskRedactSubmit"
        title="Use 1-10 letters or numbers without special symbols"
        type="submit"
        onClick={renameTask}
        disabled={
          !patterns.blockName.test(inputName)
          || !patterns.blockName.test(inputDate)
        }
      >
        OK
      </button>
    </div>
  );
};

export default ChangeRequestTaskField;
