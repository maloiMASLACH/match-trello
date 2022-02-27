import React, { useState } from 'react';
import { AddFormProps } from '../../../../../types/newDeck';
import './styles.css';
import Firebase, { FirebaseContext } from '../../../../../utils/fireBase';

const AddForm = (props: AddFormProps) => {
  const { setActive, userState, setUserState } = props;

  const [inputValue, setInputValue] = useState('');

  const addDeck = (name: string, firebase: Firebase) => {
    const newState = userState;
    const deckName = name.split(' ').join('_');
    const newDeck = {
      colons: {
        First_Colon: {
          tasks: {
            task: {
              taskName: 'task',
              date: 'tomorrow',
              completed: false,
              id: 1,
            },
          },
          id: 1,
          colonName: 'First Colon',
        },
      },
      id: userState.decks ? Object.keys(userState.decks).length + 1 : 1,
    };

    if (!newState.decks) {
      newState.decks = {};
    }

    newState.decks[deckName] = newDeck;

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
            className="addDeckImgClose"
            onClick={() => setActive(false)}
            aria-hidden="true"
          />
          <input
            type="text"
            value={inputValue}
            placeholder="Deck name"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              addDeck(inputValue, firebase);
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
