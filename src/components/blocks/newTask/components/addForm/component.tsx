import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import sortCards from '../../../../../utils/sortCards';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { NewTaskAddProps } from '../../../../../types/newTask';
import patterns, { validateBlockName } from '../../../../../utils/patterns';

const AddForm = (props: NewTaskAddProps) => {
  const { uid, deskObjName, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [touchedName, setTouchedName] = useState(false);
  const [touchedDate, setTouchedDate] = useState(false);

  const errorName = validateBlockName(inputName);
  const errorDate = validateBlockName(inputDate);

  const addTask = () => {
    let lastId = 0;

    if (columnValue.tasks) {
      const sortedTasks = Object.values(columnValue.tasks).sort(sortCards);

      lastId = sortedTasks[sortedTasks.length - 1].id;
    }

    const columnObjName = columnValue.columnName.split(' ').join('');
    const taskObjName = inputName.split(' ').join('');

    firebase.task(uid, deskObjName, columnObjName, taskObjName).update({
      taskName: inputName,
      date: inputDate,
      completed: false,
      id: lastId + 1,
    });

    handleActive();
  };

  return (
    <div className="addTaskBlock">
      <div className="inputBlock">
        <input
          onBlur={() => setTouchedName(true)}
          type="text"
          value={inputName}
          placeholder="Task name"
          onChange={(e) => setInputName(e.target.value)}
        />
        <p>{touchedName && errorName}</p>
      </div>
      <div className="inputBlock">
        <input
          onFocus={() => setTouchedDate(true)}
          type="text"
          value={inputDate}
          placeholder="Task date"
          onChange={(e) => setInputDate(e.target.value)}
        />
        <p>{touchedDate && errorDate}</p>
      </div>

      <button
        title="Use 1-10 letters or numbers without special symbols"
        type="submit"
        disabled={!(patterns.blockName.test(inputName)) || !(patterns.blockName.test(inputDate))}
        onClick={addTask}
      >
        confirm
      </button>
      <img
        src="./../x.png"
        alt="add"
        className="addTaskImgClose"
        onClick={handleActive}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddForm;
