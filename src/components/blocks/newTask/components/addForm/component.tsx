import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import sortCards from '../../../../../utils/sortCards';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { NewTaskAddProps } from '../../../../../types/newTask';

const AddForm = (props: NewTaskAddProps) => {
  const { uid, deskObjName, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

  const addTask = (name: string, date: string) => {
    let lastId = 0;

    if (columnValue.tasks) {
      lastId = Object.values(columnValue.tasks).sort(sortCards).slice(-1)[0].id;
    }

    const columnObjName = columnValue.columnName.split(' ').join('');
    const taskObjName = name.split(' ').join('');

    firebase
      .task(uid, deskObjName, columnObjName, taskObjName)
      .update({
        taskName: name,
        date,
        completed: false,
        id: lastId + 1,
      });

    handleActive();
  };

  return (
    <div className="addTaskBlock">
      <input
        type="text"
        value={inputName}
        placeholder="Task name"
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        type="text"
        value={inputDate}
        placeholder="Task date"
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button
        type="submit"
        disabled={!inputName || !inputDate}
        onClick={() => {
          addTask(inputName, inputDate);
        }}
      >
        confirm
      </button>
      <img
        src="./x.png"
        alt="add"
        className="addTaskImgClose"
        onClick={() => handleActive()}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddForm;
