import React, { useContext, useState } from 'react';
import patterns, { validateBlockName, validateDescription } from '../../../../../utils/patterns';
import { ChangeTaskProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import './styles.css';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const {
    uid, columnObjId, deskObjId, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');
  const [inputDescription, setInputDescription] = useState(taskValue.description || '');

  const renameTask = () => {
    const modifiedTask = {
      ...taskValue,
      taskName: inputName,
      date: inputDate,
      description: inputDescription,
    };

    firebase.task(uid, deskObjId, columnObjId, taskValue.id).set(modifiedTask);

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
          className="newTaskName"
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
          className="newTaskName"
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
        disabled={!(patterns.blockName.test(inputName))
          || !(patterns.blockName.test(inputDate))
          || inputDescription.length > 120}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeTaskField;
