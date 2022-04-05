import React, { useContext, useState } from 'react';
import patterns, { validateBlockName, validateDescription } from '../../../../../utils/patterns';
import { ChangeTaskProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import './styles.css';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const {
    uid, columnObjName, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');
  const [inputDescription, setInputDescription] = useState(taskValue.description || '');

  const errorName = validateBlockName(inputName);
  const errorDate = validateBlockName(inputDate);
  const errorDescription = validateDescription(inputDescription.toString());

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
        disabled={!(patterns.blockName.test(inputName)) || !(patterns.blockName.test(inputDate))}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeTaskField;
