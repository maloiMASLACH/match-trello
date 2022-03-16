import React, { useContext, useState } from 'react';
import patterns from '../../../../../constants/patterns';
import { ChangeTaskProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const {
    uid, columnObjName, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');

  const renameTask = () => {
    const taskObjName = taskValue.taskName.split(' ').join('');
    const newObj = inputName.split(' ').join('');

    firebase.task(uid, deskObjName, columnObjName, taskObjName).set(null);

    taskValue.taskName = inputName;
    taskValue.date = inputDate;

    firebase.task(uid, deskObjName, columnObjName, newObj).set(taskValue);

    handleChanging();
  };

  return (
    <>
      <input
        className="newTaskName"
        type="text"
        value={inputName}
        placeholder="Task"
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="newTaskName"
        type="text"
        value={inputDate}
        placeholder="Date"
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button
        className="taskRedactSubmit"
        type="submit"
        onClick={renameTask}
        disabled={!(patterns.blockName.test(inputName)) || !(patterns.blockName.test(inputDate))}
      >
        OK
      </button>
    </>
  );
};

export default ChangeTaskField;
