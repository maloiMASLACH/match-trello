import React, { useState } from 'react';
import { AddFormProps } from '../../../../../types/newColumn';
import './styles.css';
import Firebase, { FirebaseContext } from '../../../../../utils/fireBase';

const AddForm = (props: AddFormProps) => {
  const {
    setActive, userState, setUserState, deskName,
  } = props;

  const [inputValue, setInputValue] = useState('');

  const addColumn = (name: string, firebase: Firebase) => {
    const newDesk = userState;
    const columnName = name.split(' ').join('_');
    const newColumn = {
      tasks: {
        task: {
          taskName: 'task',
          date: 'tomorrow',
          completed: false,
          id: 1,
        },
      },
      id: userState.desks[deskName].columns
        ? Object.keys(userState.desks[deskName].columns).length + 1
        : 1,
      columnName: name,
    };
    if (!newDesk.desks[deskName].columns) {
      newDesk.desks[deskName].columns = {};
    }
    newDesk.desks[deskName].columns[columnName] = newColumn;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setActive(false);
      });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className="addColonBlock">
          <img
            src="./x.png"
            alt="add"
            className="addColonImgClose"
            onClick={() => setActive(false)}
            aria-hidden="true"
          />
          <input
            type="text"
            value={inputValue}
            placeholder="Colon name"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              addColumn(inputValue, firebase);
            }}
          >
            confirm
          </button>
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

export default AddForm;
