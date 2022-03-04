import React, { useContext, useState } from 'react';
import { HandleChanging } from '../../../../../types/toggle';
import { FirebaseContext } from '../../../../../utils/fireBase';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';

const ChangeNameField = (props: HandleChanging) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);
  const columnValue = useContext(ColumnValueContext);
  const taskValue = useContext(TaskValueContext);

  const renameTask = (name: string, date: string) => {
    const columnObjName = columnValue?.columnName.split(' ').join('');
    const deskObjName = deskValue?.deskName.split(' ').join('');
    const taskObjName = taskValue!.taskName.split(' ').join('');
    const newObj = name.split(' ').join('');

    firebase!
      .task(userValue!.uid, deskObjName!, columnObjName!, taskObjName)
      .set(null);

    taskValue!.taskName = name;
    taskValue!.date = date;

    firebase!
      .task(userValue!.uid, deskObjName!, columnObjName!, newObj)
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
