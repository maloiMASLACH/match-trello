import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './newColon.css';

interface NewColonProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
}
interface AddTabletProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AddFormProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
}

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;

  return (
    <div className="addColonBlock">
      <p>Create new colon</p>
      <img
        src="./plus.png"
        alt="add"
        className="addColonImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};

const AddForm = (props: AddFormProps) => {
  const {
    setActive, userState, setUserState, deckName,
  } = props;

  const [inputValue, setInputValue] = useState('');

  const addColon = (name: string, firebase: Firebase) => {
    const newDeck = userState;
    const colonName = name.split(' ').join('_');
    const newColon = {
      tasks: {
        task: {
          taskName: 'task',
          date: 'tomorrow',
          completed: false,
          id: 1,
        },
      },
      id: userState.decks[deckName].colons
        ? Object.keys(userState.decks[deckName].colons).length + 1
        : 1,
      colonName: name,
    };
    if (!newDeck.decks[deckName].colons) {
      newDeck.decks[deckName].colons = {};
    }
    newDeck.decks[deckName].colons[colonName] = newColon;

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
              addColon(inputValue, firebase);
            }}
          >
            confirm
          </button>
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

const NewColon = (props: NewColonProps) => {
  const { userState, setUserState, deckName } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
        deckName={deckName}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewColon;
