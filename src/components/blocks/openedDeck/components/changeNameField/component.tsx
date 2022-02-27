import React, { useState } from 'react';
import './styles.css';
import { ChangeNameFieldProps } from '../../../../../types/openedDeck';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState, setUserState, deckName, setChanging, firebase,
  } = props;

  const renameDeck = (inputValue: string) => {
    const newDeck = userState;
    const newDeckName = inputValue.split(' ').join('_');
    newDeck.decks[newDeckName] = newDeck.decks[deckName];

    newDeck.decks[deckName] = null;

    setUserState(newDeck);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setChanging(false);
      });
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input
        className="newDeckName"
        type="text"
        value={inputValue}
        placeholder="New deck name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="newDeckNameSubmit"
        type="submit"
        onClick={() => renameDeck(inputValue)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
