import React, { useState } from 'react';
import { AddFormProps } from '../../../../../types/newDesk';
import './styles.css';
import Firebase, { FirebaseContext } from '../../../../../utils/fireBase';

const AddForm = (props: AddFormProps) => {
  const { setActive, userState, setUserState } = props;

  const [inputValue, setInputValue] = useState('');

  const addDesk = (name: string, firebase: Firebase) => {
    const newState = userState;
    const deskName = name.split(' ').join('_');
    const newDesk = {
      columns: {
        First_Column: {
          tasks: {
            task: {
              taskName: 'task',
              date: 'tomorrow',
              completed: false,
              id: 1,
            },
          },
          id: 1,
          columnName: 'First Column',
        },
      },
      id: userState.desks ? Object.keys(userState.desks).length + 1 : 1,
    };

    if (!newState.desks) {
      newState.desks = {};
    }

    newState.desks[deskName] = newDesk;

    setUserState(newState);

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
        <div className="addBlock">
          <img
            src="./x.png"
            alt="add"
            className="addDeskImgClose"
            onClick={() => setActive(false)}
            aria-hidden="true"
          />
          <input
            type="text"
            value={inputValue}
            placeholder="Desk name"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              addDesk(inputValue, firebase);
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
