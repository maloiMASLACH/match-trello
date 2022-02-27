import React, { useState } from 'react';
import { AddFormProps } from '../../../../../types/newTask';
import './styles.css';
import Firebase, { FirebaseContext } from '../../../../../utils/fireBase';

const AddForm = (props: AddFormProps) => {
  const {
    setActive, userState, setUserState, deckName, colonName,
  } = props;

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

  const addTask = (name: string, date: string, firebase: Firebase) => {
    const newDeck = userState;

    const taskName = name.split(' ').join('');
    const colonObj = colonName.split(' ').join('_');

    const newTask = {
      taskName,
      date,
      completed: false,
      id: userState.decks[deckName].colons[colonObj].tasks
        ? Object.keys(userState.decks[deckName].colons[colonObj].tasks).length
          + 1
        : 1,
    };

    if (!userState.decks[deckName].colons[colonObj].tasks) {
      newDeck.decks[deckName].colons[colonObj].tasks = {};
    }

    newDeck.decks[deckName].colons[colonObj].tasks[taskName] = newTask;

    setUserState(newDeck);

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
            onClick={() => {
              addTask(inputName, inputDate, firebase);
            }}
          >
            confirm
          </button>
          <img
            src="./x.png"
            alt="add"
            className="addTaskImgClose"
            onClick={() => setActive(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

export default AddForm;
