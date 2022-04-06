import React, { useContext, useState } from 'react';
import patterns, { validateBlockName, validateDescription } from '../../../../../utils/patterns';
import { ChangeTaskProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import './styles.css';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const {
    uid, columnObjName, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');
  const [inputDescription, setInputDescription] = useState(taskValue.description || '');

  const renameTask = () => {
    const taskObjName = taskValue.taskName.split(' ').join('');
    const newObj = inputName.split(' ').join('');

    firebase.task(uid, deskObjName, columnObjName, taskObjName).set(null);

    taskValue.taskName = inputName;
    taskValue.date = inputDate;
    taskValue.description = inputDescription;

    firebase.task(uid, deskObjName, columnObjName, newObj).set(taskValue);

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
          className="newTaskName"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <InputBlock
          id={inputDate}
          value={inputDate}
          label=""
          placeholder="Task"
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
          placeholder="Description"
          validation={validateDescription}
        />
      </div>
      <button
        className="taskRedactSubmit"
        title="Use 1-10 letters or numbers without special symbols"
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
