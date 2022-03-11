import React, { useContext, useState } from 'react';
import { ChangeTaskProps } from '../../../../../types/taskBlock';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';

const ChangeNameField = (props: ChangeTaskProps) => {
  const {
    uid, columnObjName, deskObjName, handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

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
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
