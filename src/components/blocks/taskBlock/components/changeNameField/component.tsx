import React, { useContext, useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/taskBlock';
import { FirebaseContext } from '../../../../../utils/fireBase';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deskName,
    columnName,
    taskName,
    setChanging,
  } = props;

  const firebase = useContext(FirebaseContext);

  const columnObj = columnName.split(' ').join('_');
  const deskNameObj = deskName.split(' ').join('_');

  const renameTask = (name: string, date: string) => {
    const newDesk = userState;
    newDesk.desks[deskNameObj as any]!.columns[columnObj as any]!.tasks[
      name as any
    ] = newDesk.desks[deskNameObj as any]!.columns[columnObj as any]!.tasks[
      taskName as any
    ];

    newDesk.desks[deskNameObj as any]!.columns[columnObj as any]!.tasks[
      name as any
    ]!.date = date;

    newDesk.desks[deskNameObj as any]!.columns[columnObj as any]!.tasks[
      name as any
    ]!.taskName = name;

    newDesk.desks[deskNameObj as any]!.columns[columnObj as any]!.tasks[
      taskName as any
    ] = null;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setChanging(false);
      });
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
