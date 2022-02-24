import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './newDeck.css';

interface NewDeckProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AddFormProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;
  return (
    <div className="addBlock">
      <p>Create new deck</p>
      <img
        src="./plus.png"
        alt="add"
        className="addDeckImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};

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

const NewDeck = (props: NewDeckProps) => {
  const { userState, setUserState } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewDeck;
