import React, { useContext, useState } from 'react';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../../../utils/patterns';
import { FirebaseContext } from '../../../../../utils/fireBase';
import './styles.css';
import { ChangeRequestTaskProps } from '../../../../../types/requestPage';
import RequesterContext from '../../../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../../../utils/valueContexts/senderContext';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';

const ChangeRequestTaskField = (props: ChangeRequestTaskProps) => {
  const {
    task, received, handleChanging, uid,
  } = props;

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [inputName, setInputName] = useState(task.taskName || '');
  const [inputDate, setInputDate] = useState(task.date || '');
  const [inputDescription, setInputDescription] = useState(
    task.description || '',
  );

  const renameTask = () => {
    const taskObjName = task.taskName.split(' ').join('') + task.id;
    const newTaskObjName = inputName.split(' ').join('') + task.id;

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

    task.taskName = inputName;
    task.date = inputDate;
    task.description = inputDescription;

    firebase
      .sendRequest(
        received ? uid : receiver.key.slice(1),
        received ? requester.key.slice(1) : uid,
        newTaskObjName,
      )
      .set(task)
      .then(() => {
        firebase
          .sendedTask(
            received ? requester.key.slice(1) : uid,
            received ? uid : receiver.key.slice(1),
            newTaskObjName,
          )
          .set(newTaskObjName);
      });

    handleChanging();
  };

  return (
    <div className="changeTaskBlock">
      <div className="changeTaskInputBlock">
        <InputBlock
          id={inputName}
          value={inputName}
          label=""
          placeholder="Task"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <InputBlock
          id={inputDate}
          value={inputDate}
          label=""
          placeholder="Date"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <TextArea
          id="Description"
          className="newTaskName"
          value={inputDescription}
          onChange={
            (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescription(e.target.value)
          }
          placeholder="Description"
          validation={validateDescription}
        />
      </div>
      <button
        className="taskRedactSubmit"
        title="Use 1-10 letters or numbers without special symbols"
        type="submit"
        onClick={renameTask}
        disabled={
          !patterns.blockName.test(inputName)
          || !patterns.blockName.test(inputDate)
          || inputDescription.length > 120
        }
      >
        OK
      </button>
    </div>
  );
};

export default ChangeRequestTaskField;
