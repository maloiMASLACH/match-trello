import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import sortCards from '../../../../../utils/sortCards';
import DeskValueContext from '../../../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../../../utils/valueContexts/userValueContext';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { HandleActive } from '../../../../../types/toggle';

const AddForm = (props: HandleActive) => {
  const { handleActive } = props;

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskValue = useContext(DeskValueContext);
  const columnValue = useContext(ColumnValueContext);

  const addTask = (name: string, date: string) => {
    let lastId = 0;
    if (columnValue?.tasks) {
      lastId = Object.values(columnValue?.tasks).sort(sortCards).slice(-1)[0]
        ?.id!;
    }

    const deskObjName = deskValue?.deskName.split(' ').join('');
    const columnObjName = columnValue?.columnName.split(' ').join('');
    const taskObjName = name?.split(' ').join('');

    firebase!
      .task(userValue!.uid, deskObjName!, columnObjName!, taskObjName)
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
