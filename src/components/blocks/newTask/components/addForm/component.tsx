import React, { useContext, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import sortCards from '../../../../../utils/sortCards';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { NewTaskAddProps } from '../../../../../types/newTask';
import patterns, { validateBlockName, validateDescription } from '../../../../../utils/patterns';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';

const AddForm = (props: NewTaskAddProps) => {
  const { uid, deskObjName, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');

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
      description: inputDescription,
      id: lastId + 1,
    });

    handleActive();
  };

  return (
    <div className="addTaskBlock">
      <div className="inputBlock">
        <InputBlock
          id={inputName}
          value={inputName}
          label=""
          placeholder="Task name"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <InputBlock
          id={inputDate}
          value={inputDate}
          label=""
          placeholder="Task date"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <TextArea
          id="Description"
          value={inputDescription}
          onChange={
            (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescription(e.target.value)
          }
          placeholder="Description"
          validation={validateDescription}
        />
      </div>

      <button
        title="Use 1-10 letters or numbers without special symbols"
        type="submit"
        disabled={!(patterns.blockName.test(inputName))
          || !(patterns.blockName.test(inputDate))
          || inputDescription.length > 120}
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
