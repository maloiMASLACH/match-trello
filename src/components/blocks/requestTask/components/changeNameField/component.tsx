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
import Placeholders from '../../../../../constants/placeholders';

const ChangeRequestTaskField = (props: ChangeRequestTaskProps) => {
  const {
    task, received, handleChanging, currentId,
  } = props;

  const firebase = useContext(FirebaseContext);
  const requester = useContext(RequesterContext);
  const receiver = useContext(SenderContext);

  const [inputName, setInputName] = useState(task.taskName || '');
  const [inputDate, setInputDate] = useState(task.date || '');
  const [inputDescription, setInputDescription] = useState(
    task.description || '',
  );

  const { senderId, receiverId } = {
    senderId: received ? currentId : receiver.key.slice(1),
    receiverId: received ? requester.key.slice(1) : currentId,
  };

  const renameTask = () => {
    const updatedTask = {
      ...task,
      taskName: inputName,
      date: inputDate,
      description: inputDescription,
    };

    firebase
      .sendRequest(
        senderId,
        receiverId,
        task.id,
      )
      .update(updatedTask)
      .then(() => {
        firebase
          .sendedTask(
            receiverId,
            senderId,
            task.id,
          )
          .update(task.id);
      });

    handleChanging();
  };

  return (
    <div className="changeTaskBlock">
      <div className="changeTaskInputBlock">
        <InputBlock
          id="changeTaskName"
          value={inputName}
          placeholder={Placeholders.TaskName}
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <InputBlock
          id="changeTaskDate"
          value={inputDate}
          placeholder={Placeholders.TaskDate}
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
          placeholder={Placeholders.Description}
          validation={validateDescription}
        />
      </div>
      <button
        className="taskRedactSubmit"
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
