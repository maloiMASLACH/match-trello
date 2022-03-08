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

  const renameTask = (name: string, date: string) => {
    const taskObjName = taskValue.taskName.split(' ').join('');
    const newObj = name.split(' ').join('');

    firebase
      .task(uid, deskObjName, columnObjName, taskObjName)
      .set(null);

    taskValue.taskName = name;
    taskValue.date = date;

    firebase
      .task(uid, deskObjName, columnObjName, newObj)
      .set(taskValue);

    handleChanging();
  };
  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

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
        onClick={() => renameTask(inputName, inputDate)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
