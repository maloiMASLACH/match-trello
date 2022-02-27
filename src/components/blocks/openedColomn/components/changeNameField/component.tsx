import React, { useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/openedColumn';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deckName,
    colonName,
    setChanging,
    firebase,
  } = props;

  const renameDeck = (inputValue: string) => {
    const newDeck = userState;

    const oldColonName = colonName.split(' ').join('_');
    const newColonName = inputValue.split(' ').join('_');

    newDeck.decks[deckName].colons[newColonName] = newDeck.decks[deckName].colons[oldColonName];
    newDeck.decks[deckName].colons[newColonName].colonName = inputValue;

    newDeck.decks[deckName].colons[oldColonName] = null;

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
        placeholder="New colon name"
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
