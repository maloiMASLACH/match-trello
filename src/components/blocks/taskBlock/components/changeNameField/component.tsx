import React, { useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/taskBlock';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deskName,
    columnName,
    taskName,
    setChanging,
    firebase,
  } = props;

  const columnObj = columnName.split(' ').join('_');

  const renameDesk = (name: string, date: string) => {
    const newDesk = userState;
    newDesk.desks[deskName]
      .columns[columnObj].tasks[name] = newDesk.desks[deskName].columns[columnObj].tasks[taskName];
    newDesk.desks[deskName].columns[columnObj].tasks[name].date = date;
    newDesk.desks[deskName].columns[columnObj].tasks[name].taskName = name;

    newDesk.desks[deskName].columns[columnObj].tasks[taskName] = null;

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
        onClick={() => renameDesk(inputName, inputDate)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
